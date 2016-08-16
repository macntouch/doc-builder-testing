# Class for Wrapping doc building
require 'tempfile'
require 'ooxml_parser'
require_relative 'doc_builder_helper'
class DocBuilderWrapper
  include DocBuilderHelper

  # Path to Builder exe
  attr_accessor :builder_exe

  def initialize(builder_exe: '/usr/bin/documentbuilder')
    @builder_exe = builder_exe
  end

  def build_doc(script_file)
    build_result = `#{@builder_exe} #{script_file} 2>&1`
    if /[Ee]rror|not found/ === build_result
      return if /licence error/ === build_result
      raise DocBuilderError, build_result
    end
  end

  # Build document and parse it
  # @param script_file [String] path to script file
  # @return [OoxmlParser::CommonDocumentStructure] parsed file
  def build_doc_and_parse(script_file)
    temp_script_data = DocBuilderWrapper.change_output_file(script_file)
    build_doc(temp_script_data[:temp_script_file])
    parse(temp_script_data[:temp_output_file])
  end

  # Make a copy of script file, so no need to change output path on real file
  # @param script_file [String] path to actual script file
  # @param format [Symbol, String] type of file (docx, xlsx)
  # @return [Hash] {temp_script_file: file_path, temp_output_file: output_path}
  def self.change_output_file(script_file)
    script_file_content = File.open(script_file, 'r').read
    output_format = DocBuilderWrapper.recognize_output_format(script_file_content)
    temp_output_file = Tempfile.new([File.basename(script_file), ".#{output_format}"])
    script_file_content.gsub!(/^builder\.SaveFile.*$/, "builder.SaveFile(\"#{output_format}\", \"#{temp_output_file.path}\");")
    temp_script_file = Tempfile.new([File.basename(script_file), File.extname(script_file)])
    temp_script_file.write(script_file_content)
    temp_script_file.close
    { temp_script_file: temp_script_file.path, temp_output_file: temp_output_file.path }
  end

  # Recognize format from script file
  # @param script [String] script content
  # @return [String] type of file
  def self.recognize_output_format(script)
    script.match(/builder.SaveFile\(\"(.*)\",/)[1]
  end
end

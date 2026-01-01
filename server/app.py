import uuid
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_cors import CORS

from file_manager import FileManager
from converter import Converter
from merge import Merger
from compressor import Compressor

import os

app = Flask(__name__)
CORS(app)

file_manager = FileManager()
converter = Converter(file_manager)
merger = Merger(file_manager)
compressor = Compressor(file_manager)

@app.route('/convert', methods=['POST'])
def convert_endpoint():
    if 'files' not in request.files:
        return jsonify({"error": "No files part"}), 400
    files = request.files.getlist('files')
    if not files or files[0].filename == '':
        return jsonify({"error": "No selected files"}), 400

    try:
        pdf_files = [converter.convert_file(f) for f in files]

        if len(pdf_files) == 1:
            pdf_url = url_for('download_file', filename=pdf_files[0], _external=True)
            return jsonify({
                "message": "Single file converted",
                "pdf_file": pdf_files[0],
                "pdf_url": pdf_url,
                "files_count": len(files)
            })
        else:
            pdf_paths = [os.path.join(file_manager.upload_folder, pdf) for pdf in pdf_files]
            zip_id = uuid.uuid4().hex
            zip_filename = f"converted_{zip_id}.zip"
            zip_path = file_manager.create_zip(pdf_paths, zip_filename)
            zip_url = url_for('download_zip', filename=zip_filename, _external=True)

            return jsonify({
                "message": "Multiple files converted and zipped",
                "zip_file": zip_filename,
                "zip_url": zip_url,
                "files_count": len(files)
            })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/merge', methods=['POST'])
def merge_endpoint():
    if 'files' not in request.files:
        return jsonify({"error": "No files part"}), 400
    files = request.files.getlist('files')
    if not files or files[0].filename == '':
        return jsonify({"error": "No selected files"}), 400

    try:
        merged_pdf = merger.merge_pdfs(files)
        pdf_url = url_for('download_file', filename=merged_pdf, _external=True)

        return jsonify({
            "message": "PDFs merged successfully",
            "pdf_file": merged_pdf,
            "pdf_url": pdf_url,
            "files_count": len(files)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/compress', methods=['POST'])
def compress_endpoint():
    if 'files' not in request.files:
        return jsonify({"error": "No files part"}), 400
    files = request.files.getlist('files')
    if not files or files[0].filename == '':
        return jsonify({"error": "No selected file"}), 400

    quality = request.form.get('qualityOption', 'medium').lower()
    if quality not in ['low', 'medium', 'high']:
        quality = 'medium'

    try:
        compressed_pdf = compressor.compress(files[0], quality)
        pdf_url = url_for('download_file', filename=compressed_pdf, _external=True)

        return jsonify({
            "message": "PDF compressed successfully",
            "pdf_file": compressed_pdf,
            "pdf_url": pdf_url,
            "quality": quality
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    return send_from_directory(file_manager.upload_folder, filename, as_attachment=True)


@app.route('/download/zip/<filename>', methods=['GET'])
def download_zip(filename):
    return send_from_directory(file_manager.zip_folder, filename, as_attachment=True)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)

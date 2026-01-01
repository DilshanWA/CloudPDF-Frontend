import os
import uuid
import subprocess
from PIL import Image

IMAGE_EXTENSIONS = (".png", ".jpg", ".jpeg", ".bmp", ".tiff", ".webp")

class Converter:
    A4_WIDTH, A4_HEIGHT = 595, 842

    def __init__(self, file_manager):
        self.file_manager = file_manager

    def image_to_a4_pdf(self, input_path, output_pdf_path):
        image = Image.open(input_path)
        if image.mode in ("RGBA", "LA") or (image.mode == "P" and "transparency" in image.info):
            background = Image.new("RGB", image.size, (255, 255, 255))
            background.paste(image, mask=image.split()[-1])
            image = background
        else:
            image = image.convert("RGB")

        image.thumbnail((self.A4_WIDTH, self.A4_HEIGHT))
        a4_canvas = Image.new("RGB", (self.A4_WIDTH, self.A4_HEIGHT), "white")
        x = (self.A4_WIDTH - image.width) // 2
        y = (self.A4_HEIGHT - image.height) // 2
        a4_canvas.paste(image, (x, y))
        a4_canvas.save(output_pdf_path, "PDF")

    def convert_file(self, file):
        filename = file.filename
        name, ext = os.path.splitext(filename)
        ext = ext.lower()

        filepath = self.file_manager.save_file(file)

        if ext in IMAGE_EXTENSIONS:
            pdf_filename = f"{name}_{uuid.uuid4().hex}.pdf"
            pdf_path = os.path.join(self.file_manager.upload_folder, pdf_filename)
            self.image_to_a4_pdf(filepath, pdf_path)
            self.file_manager.remove_file(filepath)
            return pdf_filename

        else:
            command = [
                "soffice",
                "--headless",
                "--convert-to", "pdf",
                filepath,
                "--outdir", self.file_manager.upload_folder
            ]
            result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            if result.returncode != 0:
                self.file_manager.remove_file(filepath)
                raise RuntimeError(f"Conversion failed for {filename}: {result.stderr.decode()}")

            self.file_manager.remove_file(filepath)
            return f"{name}.pdf"

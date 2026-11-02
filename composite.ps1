$code = @"
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

public class Compositor {
    public static void Composite(string catPath, string flowerPath, string outPath, float scale, int offsetY) {
        using (Bitmap cat = new Bitmap(catPath))
        using (Bitmap flower = new Bitmap(flowerPath))
        using (Bitmap result = new Bitmap(cat.Width, cat.Height, PixelFormat.Format32bppArgb))
        using (Graphics g = Graphics.FromImage(result)) {
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.SmoothingMode = SmoothingMode.HighQuality;
            g.PixelOffsetMode = PixelOffsetMode.HighQuality;

            g.DrawImage(cat, 0, 0, cat.Width, cat.Height);

            int fw = (int)(flower.Width * scale);
            int fh = (int)(flower.Height * scale);
            int fx = (cat.Width - fw) / 2;
            int fy = offsetY;

            g.DrawImage(flower, fx, fy, fw, fh);
            result.Save(outPath, ImageFormat.Png);
            Console.WriteLine("Saved: " + outPath);
        }
    }
}
"@
Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing
[Compositor]::Composite(
    "C:\Users\uongk\.gemini\antigravity\scratch\birthday-cat-mile\assets\images\anh-tang-hoa.png",
    "C:\Users\uongk\.gemini\antigravity\scratch\birthday-cat-mile\assets\images\bo-hoa.png",
    "C:\Users\uongk\.gemini\antigravity\scratch\birthday-cat-mile\assets\images\meo-cam-hoa.png",
    0.65,
    820
)

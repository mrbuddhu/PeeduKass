$ErrorActionPreference = 'Stop'
param(
  [Parameter(Mandatory=$true)][string]$Src,
  [string]$OutDir = 'public/icons'
)

Add-Type -AssemblyName System.Drawing

if (!(Test-Path $OutDir)) {
  New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
}

function New-Icon {
  param([int]$Size, [string]$DestName)

  $img = [System.Drawing.Image]::FromFile($Src)
  try {
    $side = [int][Math]::Min($img.Width, $img.Height)
    $x = [int](($img.Width - $side) / 2)
    $y = [int](($img.Height - $side) / 2)
    $srcRect = New-Object System.Drawing.Rectangle($x, $y, $side, $side)
    $crop = New-Object System.Drawing.Bitmap($side, $side)
    $g = [System.Drawing.Graphics]::FromImage($crop)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0,0,$side,$side)), $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()

    $bmp = New-Object System.Drawing.Bitmap($Size, $Size)
    $g2 = [System.Drawing.Graphics]::FromImage($bmp)
    $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g2.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g2.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g2.DrawImage($crop, 0, 0, $Size, $Size)
    $g2.Dispose()

    $dest = Join-Path $OutDir $DestName
    $bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    $crop.Dispose()
  }
  finally {
    $img.Dispose()
  }
}

New-Icon -Size 16 -DestName 'favicon-16.png'
New-Icon -Size 32 -DestName 'favicon-32.png'
New-Icon -Size 180 -DestName 'apple-touch-icon.png'

Write-Host "Generated icons in $OutDir"



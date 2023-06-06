<?php

use CodeIgniter\Files\File;

function saveImage(File $image, $pathName)
{
  try {
    $destinationPath = 'uploads/'.$pathName;
    @mkdir($destinationPath, 777, true);

    $imageName = bin2hex(random_bytes(10)).time().'.'.$image->getExtension();
    $image->move($destinationPath, $imageName);

    return [
      'imageName' => $imageName,
      'imageUrl' => base_url('uploads/'.$pathName.'/'.$imageName),
    ];
  } catch (Exception $exception) {
    return [
      'imageName' => null,
      'imageUrl' => null,
    ];
  }
}

function deleteImage($pathName, $name)
{
  try {
    $path = 'uploads'.$pathName;
    unlink($path.'/'.$name);
  } catch (Exception $exception) {
  }
}

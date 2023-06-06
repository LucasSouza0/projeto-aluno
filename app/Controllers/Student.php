<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\StudentModel;
use CodeIgniter\HTTP\ResponseInterface;

class Student extends ResourceController
{
	protected $studentModel;
	protected $path = '/students-profile';

	public function __construct()
	{
		$this->studentModel = new StudentModel();
	}

	public function index()
	{
		$students = $this->studentModel->findAll();
		return $this->respond($students);
	}

	public function show($studentId = null)
	{
		$student = $this->studentModel->find($studentId);
		if (!$student) {
			return $this->fail('Student not found.', ResponseInterface::HTTP_BAD_REQUEST);
		}
		
		return $this->respond($student);
	}

	public function store()
	{
		$input = $this->request->getJSON();
		$this->studentModel->cleanRules(false);

		$created = $this->studentModel->insert($input);
		if (!$created) {
			return $this->fail($this->studentModel->errors(), ResponseInterface::HTTP_BAD_REQUEST);
		}

		return $this->respond($this->studentModel->find($created), ResponseInterface::HTTP_CREATED);
	}

	public function update($studentId = null)
	{
		$input = $this->request->getJSON();
		$student = $this->studentModel->find($studentId);
		if (!$student) {
			return $this->fail('Student not found.', ResponseInterface::HTTP_BAD_REQUEST);
		}

		if (isset($input->email) && $student['email'] == $input->email) {
			unset($input->email);
		}

		$updated = $this->studentModel->update($studentId, $input);
		if (!$updated) {
			return $this->fail($this->studentModel->errors(), ResponseInterface::HTTP_BAD_REQUEST);
		}

		return $this->respond($this->studentModel->find($studentId), ResponseInterface::HTTP_CREATED);
	}

	public function delete($studentId = null)
	{
		$student = $this->studentModel->find($studentId);
		if (!$student) {
			return $this->fail('Student not found.', ResponseInterface::HTTP_BAD_REQUEST);
		}

		if (!empty($student['photo'])) {
			helper('image');
			deleteImage($this->path, explode($this->path.'/', $student['photo'])[1] ?? '');
		}

		$deleted = $this->studentModel->delete($studentId);
		if (!$deleted) {
			return $this->fail($this->studentModel->errors(), ResponseInterface::HTTP_BAD_REQUEST);
		}

		return $this->respond(['deleted' => $deleted], ResponseInterface::HTTP_OK);
	}

	public function savePhoto(int $studentId)
	{
		$validationRule = [
			'photo' => [
				'label' => 'Image File',
				'rules' => [
					'uploaded[photo]',
					'is_image[photo]',
					'mime_in[photo,image/jpg,image/jpeg,image/gif,image/png,image/webp]',
					'max_size[photo,2048]',
					'max_dims[photo,1024,768]',
				],
			],
		];

		if (!$this->validate($validationRule)) {
			return $this->fail($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
		}

		$student = $this->studentModel->find($studentId);
		if (!$student) {
			return $this->fail('Student not found.', ResponseInterface::HTTP_BAD_REQUEST);
		}

		helper('image');
		if (!empty($student['photo'])) {
			deleteImage($this->path, explode($this->path.'/', $student['photo'])[1] ?? '');
		}

		$photo = $this->request->getFile('photo');
		$imageInfo = saveImage($photo, $this->path);

		if (empty($imageInfo['imageUrl'])) {
			return $this->fail(
				'Upload failed.', 
				ResponseInterface::HTTP_INTERNAL_SERVER_ERROR
			);
		}
		
		$this->studentModel->update($studentId, ['photo' => $imageInfo['imageUrl']]);
		return $this->respond($this->studentModel->find($studentId), ResponseInterface::HTTP_CREATED);
	}

	public function deletePhoto(int $studentId)
	{
		$student = $this->studentModel->find($studentId);
		if (!$student) {
			return $this->fail('Student not found.', ResponseInterface::HTTP_BAD_REQUEST);
		}

		if (!empty($student['photo'])) {
			helper('image');
			deleteImage($this->path, explode($this->path.'/', $student['photo'])[1] ?? '');
		}

		$this->studentModel->update($studentId, ['photo' => null]);
		return $this->respond($this->studentModel->find($studentId), ResponseInterface::HTTP_CREATED);
	}
}

<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;

class User extends ResourceController
{
	protected $userModel;

	public function __construct()
	{
		$this->userModel = new UserModel();
	}

	public function show($id = null)
	{
		$user = $this->userModel->find($id);
		if (!$user) {
			return $this->failNotFound('User not found', ResponseInterface::HTTP_BAD_REQUEST);
		}	
		 
		unset($user[0]['password']);
		return $this->respond($user[0]);
	}
}

<?php

namespace App\Models;

use CodeIgniter\Model;
use Exception;

class StudentModel extends Model
{
	protected $table = 'students';
	protected $useTimestamps = true;
	protected $updatedField = 'updated_at';
	
	protected $allowedFields = [
		'name',
		'email',
		'phone',
		'address',
		'photo',
		'active',
	];

	protected $validationRules = [
		'name' => 'required|max_length[100]',
    'email' => 'required|max_length[100]|is_unique[students.email]|valid_email',
		'phone' => 'required|max_length[15]',
		'address' => 'max_length[100]',
		'photo' => 'max_length[255]',
	];
}

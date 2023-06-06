<?php

namespace App\Models;

use CodeIgniter\Model;
use Exception;

class UserModel extends Model
{
  protected $table = 'users';
  protected $updatedField = 'updated_at';
  protected $allowedFields = [
    'name',
    'email',
    'password',
    'active',
  ];

  protected $validationRules = [
    'name' => 'required|max_length[100]',
    'email' => 'required|max_length[100]|is_unique[users.email]|valid_email',
    'password' => 'required|max_length[255]',
  ];

  protected $beforeInsert = ['beforeInsert'];
  protected $beforeUpdate = ['beforeUpdate'];

  protected function beforeInsert(array $data): array
  {
    return $this->getUpdatedDataWithHashedPassword($data);
  }

  protected function beforeUpdate(array $data): array
  {
    return $this->getUpdatedDataWithHashedPassword($data);
  }

  private function getUpdatedDataWithHashedPassword(array $data): array
  {
    if (isset($data['data']['password'])) {
      $plaintextPassword = $data['data']['password'];
      $data['data']['password'] = $this->hashPassword($plaintextPassword);
    }
    return $data;
  }

  private function hashPassword(string $plaintextPassword): string
  {
    return password_hash($plaintextPassword, PASSWORD_BCRYPT);
  }

  public function findUserById(int $id)
  {
    $user = $this->where('id', $id)
      ->where('active', 1)
      ->first();
    
    if (!$user) {
      throw new Exception('User not found.');
    }

    return $user;
  }

  public function findValidUser($email, $password)
  {
    $user = $this->where('email', $email)
      ->where('active', 1)
      ->first();

    if (!$user) {
      return false;
    }

    if (!password_verify($password, $user['password'])) {
      return false;
    }

    return $user;
  }
}

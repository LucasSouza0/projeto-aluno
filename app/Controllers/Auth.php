<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;
use CodeIgniter\HTTP\ResponseInterface;
use Exception;

class Auth extends ResourceController
{
  protected $userModel;

  public function __construct()
  {
    $this->userModel = new UserModel();
  }

  public function auth()
  {
    $rules = [
      'email' => 'required|valid_email',
      'password' => 'required',
    ];

    // Válida se os dados foram enviados corretamente
    $input = $this->request->getJSON();
    if (!$this->validate($rules)) {
      return $this->fail(
        $this->validator->getErrors(),
        ResponseInterface::HTTP_BAD_REQUEST
      );
    }

    // Válida usuário
    $user = $this->userModel->findValidUser($input->email, $input->password);
    if (!$user) {
      return $this->fail(
        'email or password invalid',
        ResponseInterface::HTTP_UNAUTHORIZED
      );
    }

    return $this->getJwt($user);
  }

  private function getJwt(array $user, int $statusCode = ResponseInterface::HTTP_OK)
  {
    try {
      unset($user['password']);
      helper('jwt');

      return $this->respond(
        ['user' => $user, 'access_token' => getSignedJWTForUser($user['id'])],
        $statusCode,
      );
    } catch (Exception $exception) {
      return $this->fail(
        $exception->getMessage(),
        $statusCode,
      );
    }
  }
}

<?php

use App\Models\UserModel;
use Config\Services;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function getJWTFromRequest($authenticationHeader): string
{
  if (is_null($authenticationHeader)) {
    throw new Exception('authentication failed');
  }
  
  return explode(' ', $authenticationHeader)[1];
}

function validateJWTFromRequest(string $encodedToken)
{
  $key = Services::getJwtSecret();
  $decodedToken = JWT::decode($encodedToken, new Key($key, 'HS256'));
  $userModel = new UserModel();
  $userModel->findUserById($decodedToken->id);
}

function getSignedJWTForUser(int $id)
{
  $issuedAtTime = time();
  $tokenTimeToLive = getenv('JWT_TIME_TO_LIVE');
  $tokenExpiration = $issuedAtTime + $tokenTimeToLive;
  $payload = [
    'id' => $id,
    'iat' => $issuedAtTime,
    'exp' => $tokenExpiration,
  ];

  $jwt = JWT::encode($payload, Services::getJwtSecret(), 'HS256');
  return $jwt;
}

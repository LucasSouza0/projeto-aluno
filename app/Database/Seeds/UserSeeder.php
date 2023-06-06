<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserSeeder extends Seeder
{
	public function run()
	{
		$this->db->table('users')->insert([
			'name' => 'Admin User',
			'email' => 'admin@admin.com.br',
			'password' => password_hash('admin', PASSWORD_BCRYPT),
		]);
	}
}

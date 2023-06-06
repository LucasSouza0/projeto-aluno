<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddUser extends Migration
{
	public function up()
	{
		$this->forge->addField([
			'id' => [
				'type' => 'INT',
				'constraint' => 5,
				'unsigned' => true,
				'auto_increment' => true,
			],
			'name' => [
				'type' => 'VARCHAR',
				'constraint' => 100,
			],
			'email' => [
				'type' => 'VARCHAR',
				'constraint' => 100,
				'unique' => true,
			],
			'password' => [
				'type' => 'VARCHAR',
				'constraint' 	=> 255,
			],
			'active' => [
				'type' => 'TINYINT',
				'constraint' 	=> 1,
				'default' => 1
			],
			'updated_at' => [
				'type' => 'datetime',
				'null' => true,
			],
			'created_at datetime default current_timestamp',
		]);

		$this->forge->addPrimaryKey('id');
		$this->forge->createTable('users');
	}

	public function down()
	{
		$this->forge->dropTable('users');
	}
}

<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddStudent extends Migration
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
			'phone' => [
				'type' => 'VARCHAR',
				'constraint' => 15,
			],
			'address' => [
				'type' => 'VARCHAR',
				'constraint' => 255,
				'null' => true,
			],
			'photo' => [
				'type' => 'VARCHAR',
				'constraint' => 255,
				'null' => true,
			],
			'active' => [
				'type' => 'TINYINT',
				'constraint' => 1,
				'default' => 1
			],
			'updated_at' => [
				'type' => 'datetime',
				'null' => true,
			],
			'created_at datetime default current_timestamp',
		]);

		$this->forge->addPrimaryKey('id');
		$this->forge->createTable('students');
	}

	public function down()
	{
		$this->forge->dropTable('students');
	}
}

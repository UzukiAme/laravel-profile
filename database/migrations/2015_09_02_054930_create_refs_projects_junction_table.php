<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRefsProjectsJunctionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('refs_projects_junction', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('ref_key');
            $table->integer('project_key');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('refs_projects_junction');
    }
}

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRequestChangeHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_change_histories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('content_change', 1000)->change();
            $table->softDeletes();
            $table->integer('request_id');
            $table->integer('user_id');
            $table->string('type');          
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('request_change_histories');
    }
}

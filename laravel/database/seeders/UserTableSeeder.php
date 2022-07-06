<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now('Asia/Ho_Chi_Minh')->toDateTimeString();
        DB::table('users')->insert([
            [
                'email' => 'tuan.nh201612@gmail.com',
                'name' => 'Nguyễn Hữu Tuấn',
                'password' => Hash::make('123456'),
                'phone' => '0337344408',
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
        ]);
    }
}

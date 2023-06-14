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
                'email' => 'admin@gmail.com',
                'password' => Hash::make('12345678'),
                'role' => 'ADM',
                'social_provider' => 'ADM',
                'social_id' => 'ADM',
                'first_name' => 'Nguyễn Hữu',
                'last_name' => 'Tuấn',
                'nickname' => 'Tuấn Nguyễn',
                'phone' => '0337344408',
                'avatar' => null,
                'bio' => null,
                'birthday' => $now,
                'tick' => true,
                'created_at' => $now,
                'updated_at' =>  $now,
            ]
        ]);
    }
}

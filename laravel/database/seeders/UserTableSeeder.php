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
                'password' => Hash::make('123456'),
                'first_name' => 'Nguyễn Hữu',
                'last_name' => 'Tuấn',
                'nickname' => 'Tuấn Nguyễn',
                'phone' => '0337344408',
                'avatar' => null,
                'bio' => null,
                'tick' => true,
                'followings_count' => 0,
                'followers_count' => 0,
                'likes_count' => 0,
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
            [
                'email' => 'hoa.dlp@gmail.com',
                'password' => Hash::make('123456'),
                'first_name' => 'Đào Lê',
                'last_name' => 'Phương Hoa',
                'nickname' => 'hoaahanassii',
                'phone' => null,
                'avatar' => 'https://files.fullstack.edu.vn/f8-tiktok/users/2/627394cb56d66.jpg',
                'bio' => '✨ 1998 ✨\nVietnam 🇻🇳\nĐỪNG LẤY VIDEO CỦA TÔI ĐI SO SÁNH NỮA. XIN HÃY TÔN TRỌNG !',
                'tick' => true,
                'followings_count' => 0,
                'followers_count' => 0,
                'likes_count' => 0,
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
            [
                'email' => 'thao.dt@gmail.com',
                'password' => Hash::make('123456'),
                'first_name' => 'Đinh Trang',
                'last_name' => 'Thảo',
                'nickname' => 'dinhtrangthao03',
                'phone' => null,
                'avatar' => 'https://files.fullstack.edu.vn/f8-tiktok/users/3/6273956f53b19.jpg',
                'bio' => 'IB FOR JOB ✉ IG: trangthao_2003\nFb: Đinh Trang Thảo',
                'tick' => true,
                'followings_count' => 0,
                'followers_count' => 0,
                'likes_count' => 0,
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
        ]);
    }
}

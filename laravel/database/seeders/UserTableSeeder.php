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
                'avatar' => 'http://127.0.0.1:8000/images/users/user1.jpg',
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
                'avatar' => 'http://127.0.0.1:8000/images/users/user2.jpg',
                'bio' => "✨ 1998 ✨<br>Vietnam 🇻🇳<br>ĐỪNG LẤY VIDEO CỦA TÔI ĐI SO SÁNH NỮA. XIN HÃY TÔN TRỌNG !",
                'tick' => true,
                'followings_count' => 123,
                'followers_count' => 12900000,
                'likes_count' => 297500000,
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
                'avatar' => 'http://127.0.0.1:8000/images/users/user3.jpg',
                'bio' => "IB FOR JOB ✉ IG: trangthao_2003<br>Fb: Đinh Trang Thảo",
                'tick' => true,
                'followings_count' => 0,
                'followers_count' => 0,
                'likes_count' => 0,
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
            [
                'email' => 'phimhay@gmail.com',
                'password' => Hash::make('123456'),
                'first_name' => '☘Phim',
                'last_name' => 'Hay👻',
                'nickname' => 'phimhay1005',
                'phone' => null,
                'avatar' => 'http://127.0.0.1:8000/images/users/user4.jpg',
                'bio' => null,
                'tick' => true,
                'followings_count' => 51,
                'followers_count' => 71300,
                'likes_count' => 686700,
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
            [
                'email' => 'lebongofficial@gmail.com',
                'password' => Hash::make('123456'),
                'first_name' => 'Le',
                'last_name' => 'Bong',
                'nickname' => 'lebong95',
                'phone' => null,
                'avatar' => 'http://127.0.0.1:8000/images/users/user5.jpg',
                'bio' => "“Cùng lan toả năng lượng tích cực nhé”<br>💓<br>✨duboshop✨<br>📩lebongofficial@gmail.com",
                'tick' => true,
                'followings_count' => 163,
                'followers_count' => 8900000,
                'likes_count' => 191200000,
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
        ]);
    }
}

<?php

namespace Database\Seeders;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class DiscoveTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now('Asia/Ho_Chi_Minh')->toDateTimeString();
        DB::table('discoves')->insert([
            [
                'title' => 'suthatla',
                'type' => 'tag',
                'link' => 'suthatla',
                'accesses_count' => 100,
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
            [
                'title' => 'mackedoi',
                'type' => 'tag',
                'link' => 'mackedoi',
                'accesses_count' => 90,
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
            [
                'title' => 'sansangthaydoi',
                'type' => 'tag',
                'link' => 'sansangthaydoi',
                'accesses_count' => 20,
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
            [
                'title' => 'Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media & h0n',
                'type' => 'music',
                'link' => 'Yêu-Đơn-Phương-Là-Gì-MEE-Remix',
                'accesses_count' => 150,
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
            [
                'title' => 'Về Nghe Mẹ Ru - NSND Bach Tuyet & Hứa Kim Tuyền & 14 Casper & Hoàng Dũng',
                'type' => 'music',
                'link' => 'Về-Nghe-Mẹ-Ru',
                'accesses_count' => 45,
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
            [
                'title' => 'Thiên Thần Tình Yêu - RICKY STAR',
                'type' => 'music',
                'link' => 'Thiên-Thần-Tình-Yêu',
                'accesses_count' => 70,
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
            [
                'title' => '7749hieuung',
                'type' => 'tag',
                'link' => '7749hieuung',
                'accesses_count' => 10,
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
            [
                'title' => 'genzlife',
                'type' => 'tag',
                'link' => 'genzlife',
                'accesses_count' => 18,
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
            [
                'title' => 'Tình Đã Đầy Một Tim - Huyền Tâm Môn',
                'type' => 'music',
                'link' => 'Tình-Đã-Đầy-Một-Tim',
                'accesses_count' => 68,
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
            [
                'title' => 'Thằng Hầu (Thái Hoàng Remix) [Short Version] - Dunghoangpham',
                'type' => 'music',
                'link' => 'Thằng-Hầu-Thái-Hoàng-Remix',
                'accesses_count' => 138,
                'created_at' => $now,
                'updated_at' =>  $now,
            ],
        ]);
    }
}

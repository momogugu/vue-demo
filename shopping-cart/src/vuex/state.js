// 初始状态
const state = {
    iPhone6s: {
        name: 'Apple/苹果 iPhone 6S',
        desc: '3D Touch、1200万像素照片、4k视频，强大功能于一身。',
        price: '5288-6888',
        isSelected: true,
        style: {
            '银色': 'http://o8yu724qs.bkt.clouddn.com/iphone6s-silver-select-2015.png',
            '深空灰色': 'http://o8yu724qs.bkt.clouddn.com/iphone6s-gray-select-2015.png',
            '金色': 'http://o8yu724qs.bkt.clouddn.com/iphone6s-gold-select-2015.png',
            '玫瑰金色': 'http://o8yu724qs.bkt.clouddn.com/iphone6s-rosegold-select-2015.png'
        },
        activeStyleUrl: 'http://o8yu724qs.bkt.clouddn.com/iphone6s-silver-select-2015.png',
        storage: {
            '16GB': 5288,
            '64GB': 6088,
            '128GB': 6888
        }
    },
    cart: []
}

export default state
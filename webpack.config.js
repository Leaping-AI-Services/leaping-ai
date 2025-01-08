const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	mode: 'development', // или 'production' для продакшн-сборки
	devServer: {
		port: 4000, // Порт для локального сервера
		historyApiFallback: true, // Поддержка маршрутизации HTML5
	},
	entry: {
		home: './pages/home/index.js', // Входной файл приложения
		'home-a': './pages/home/home-a.js',
		blog: './pages/blog/index.js',
		post: './pages/post/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'build'), // Папка для сборки проекта
		filename: '[name].min.js', // Шаблон для имен файлов
		publicPath: '/', // Публичный путь для доступа к ресурсам
	},
	module: {
		rules: [
			{
				test: /\.js$/, // Регулярное выражение для обработки JS файлов
				exclude: /node_modules/, // Исключаем папку node_modules
				use: ['babel-loader'], // Используем babel-loader для транспиляции JS
			},
			{
				test: /\.(mp3|wav|ogg)$/, // Регулярное выражение для аудио файлов
				use: {
					loader: 'file-loader', // Используем file-loader для обработки аудио файлов
					options: {
						name: '[name].[ext]', // Убираем хэш из имени файла
						outputPath: 'assets/audio/', // Папка, куда будут сохранены аудио файлы
						publicPath: 'assets/audio/', // Публичный путь для доступа к аудио файлам
					},
				},
			},
			{
				test: /\.css$/, // Регулярное выражение для CSS файлов
				use: ['style-loader', 'css-loader'], // Загрузчики для CSS
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(), // Плагин для очистки папки сборки перед новой сборкой
		new HtmlWebpackPlugin({
			template: './index.html', // Шаблон HTML для генерации итогового файла
		}),
	],
	resolve: {
		extensions: ['.js', '.json'], // Расширения файлов, которые можно не указывать при импорте
	},
}

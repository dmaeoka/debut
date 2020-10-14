if (!TASK_CONFIG.legacy) return

const changed = require('gulp-changed')
const gulp = require('gulp')
const path = require('path')
const projectPath = require('../lib/projectPath')

const legacyTask = function () {
	const srcPath = projectPath(PATH_CONFIG.src, PATH_CONFIG.legacy.src)
	const defaultSrcOptions = { dot: true }
	const options = Object.assign(defaultSrcOptions, (TASK_CONFIG.legacy.srcOptions || {}))

	const paths = {
		src: [
			path.join(srcPath, '**/*'),
			projectPath('!' + PATH_CONFIG.src, PATH_CONFIG.legacy.src, 'README.md')
		],
		dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.legacy.dest)
	}

	return gulp.src(paths.src, options)
		.pipe(gulp.dest(paths.dest))
}

gulp.task('legacy', legacyTask)
module.exports = legacyTask

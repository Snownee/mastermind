const gulp = require('gulp')
const filelog = require('gulp-filelog')
const gulpSquoosh = require('gulp-squoosh')
const rename = require('gulp-rename')
const { execSync } = require('child_process')
const del = require('del')

const resize = (filePath, options) => {
  let folder = /\\images\\(.+)\\/.exec(filePath)
  if (folder === null) {
    return
  }
  folder = folder[1].replace(/\\/g, '/')
  let size = 0
  if (folder.startsWith('perk/')) {
    size = 120
  } else if (folder.startsWith('item/survivors')) {
    size = 90
  } else if (folder.startsWith('item/killers')) {
    size = 60
  } else if (folder.startsWith('item/favors')) {
    size = 100
  }
  if (size > 0) {
    options['preprocessOptions'] = {
      resize: {
        width: size,
        height: size
      }
    }
  }
}

exports.build = (cb) => {
  execSync('vuepress build docs')
  let dist = 'docs/.vuepress/dist/images'
  // const dist = 'dist'
  del(`${dist}/**`, { force: true })
  return (
    gulp
      .src(['docs/.vuepress/public/images/**/*.png'])
      // .pipe(filelog())
      .pipe(
        gulpSquoosh(({ filePath }) => {
          let options = {
            encodeOptions: {
              webp: {
                quality: 80,
                alpha_quality: 50,
                exact: 1,
                method: 6,
              },
            },
          }
          resize(filePath, options)
          return options
        }),
      )
      .pipe(
        rename((path) => {
          path.extname = '.png'
        }),
      )
      .pipe(gulp.dest(dist))
  )
}

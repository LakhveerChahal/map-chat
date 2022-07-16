const { src, dest, series } = require('gulp');
const del = require('del');
const fs = require('fs');
const log = require('fancy-log');
var exec = require('child_process').exec;

const paths = {
    ang_src: 'client/',
    ang_dist_src: 'client/dist/map-chat/**/*',
    ang_dist_dest: 'public/',
}

function clean() {
    log('Deleting existing build folders...');
    return del(paths.ang_dist_dest + '**', { force: true });
}

function createBuildFolder() {
    const dir = paths.ang_dist_dest;

    log(`Creating the folder if not exist  ${dir}`);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        log('📁  folder created:', dir);
    }

    return Promise.resolve('created build folder if it was needed!');
}

function buildAngularCodeTask(cb) {
    log('building Angular code into the directory');
    return exec(`cd ${paths.ang_src} && npm install -g @angular/cli && npm install && ng build --prod`, function (err, stdout, stderr) {
        log(stdout);
        log(stderr);
        cb(err);
    });
}

function copyAngularCodeTask() {
    log('copying Angular code into the directory');
    return src(`${paths.ang_dist_src}`)
        .pipe(dest(`${paths.ang_dist_dest}`));
}

function deleteNodeModules() {
    log('Deleting Node modules to decrease bundle size...');
    return del(paths.ang_src + 'node_modules/**');
}

exports.default = series(
    clean,
    createBuildFolder,
    buildAngularCodeTask,
    copyAngularCodeTask,
    deleteNodeModules,
);

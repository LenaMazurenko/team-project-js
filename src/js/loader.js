let hide = document.querySelector('.hide');

window.addEventListener('load', () => {
hide.classList.add('behind');
setTimeout(() =>  {
    hide.remove();
}, 3000);
});

// Window.onload = function () {
//     setTimeout(function () {
//         var preloader = document.getElementById('page-preloader');
//         if (!preloader.classList.contains('done'))
//         {
//             preloader.classList.add('done')
//             }
//      },10)
// }

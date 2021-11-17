import $ from 'jquery';
import './style.css';
// 获取dom
let $buttons = $('#buttons>button');
let $slides = $('#slides');
let $images = $slides.children();
let current = 0;

// 制作假的dom
makeFakeDom();
// 初始化
$slides.css({ transform: 'translateX(-400px)' });
// 绑定事件
bindEvent();
// 上一张，下一张
$('.controls>.prev').on('click', () => {
  goToSlide(current - 1);
});
$('.controls>.next').on('click', () => {
  goToSlide(current + 1);
});
// 自动播放
var timer = setInterval(() => {
  goToSlide(current + 1);
}, 2000);
// 鼠标悬停停止
$('.container')
  .on('mouseenter', () => {
    clearInterval(timer);
  })
  .on('mouseleave', () => {
    timer = setInterval(() => {
      goToSlide(current + 1);
    }, 2000);
  });

function bindEvent() {
  $('#buttons').on('click', 'button', (e) => {
    let currentButton = e.currentTarget;
    let index = $(currentButton).index();
    // 点击按钮去指定的幻灯片
    goToSlide(index);
  });
}

function makeFakeDom() {
  let $firstCopy = $images.eq(0).clone(true);
  let $lastCopy = $images.eq($images.length - 1).clone(true);
  $slides.append($firstCopy);
  $slides.prepend($lastCopy);
}

function goToSlide(index) {
  if (index > $buttons.length - 1) {
    index = 0;
  } else if (index < 0) {
    index = $buttons.length - 1;
  }
  if (current === $buttons.length - 1 && index === 0) {
    // 最后一张到第一张
    $slides
      .css({
        transform: `translateX(${-($buttons.length + 1) * 400}px)`,
      })
      .one('transitionend', (e) => {
        $(e.currentTarget).hide().offset();
        $(e.currentTarget)
          .css({
            transform: `translateX(${-(index + 1) * 400}px)`,
          })
          .show();
      });
  } else if (current === 0 && index === $buttons.length - 1) {
    // 第一张到最后一张
    $slides
      .css({
        transform: 'translateX(0px)',
      })
      .one('transitionend', (e) => {
        $(e.currentTarget).hide().offset();
        $(e.currentTarget)
          .css({
            transform: `translateX(${-$buttons.length * 400}px)`,
          })
          .show();
      });
  } else {
    $slides.css({
      transform: `translateX(${-(index + 1) * 400}px)`,
    });
  }
  current = index;
}

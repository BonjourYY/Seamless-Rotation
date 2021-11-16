import $ from 'jquery';
import './style.css';
// 获取dom
let $buttons = $('#buttons>button');
let $slides = $('#slides');
let $images = $slides.children();

// 制作假的dom
makeFakeDom();
// 初始化
$slides.css({ transform: 'translateX(-400px)' });
// 绑定事件
bindEvent();

function bindEvent() {
  let current = 0;
  $buttons.eq(0).on('click', () => {
    if (current == 2) {
      console.log('你是从最后一张跳到第一张😉');
      $slides
        .css({
          transform: 'translateX(-1600px)',
        })
        .one('transitionend', (e) => {
          $(e.currentTarget).hide().offset();
          $(e.currentTarget)
            .css({
              transform: 'translateX(-400px)',
            })
            .show();
        });
    } else {
      $slides.css({
        transform: 'translateX(-400px)',
      });
    }

    current = 0;
  });

  $buttons.eq(1).on('click', () => {
    $slides.css({
      transform: 'translateX(-800px)',
    });
    current = 1;
  });

  $buttons.eq(2).on('click', () => {
    if (current == 0) {
      console.log('你是从第一张跳到最后一张😁');
      $slides
        .css({
          transform: 'translateX(0px)',
        })
        .one('transitionend', (e) => {
          $(e.currentTarget).hide().offset();
          $(e.currentTarget)
            .css({
              transform: 'translateX(-1200px)',
            })
            .show();
        });
    } else {
      $slides.css({
        transform: 'translateX(-1200px)',
      });
    }
    current = 2;
  });
}

function makeFakeDom() {
  let $firstCopy = $images.eq(0).clone(true);
  let $lastCopy = $images.eq($images.length - 1).clone(true);
  $slides.append($firstCopy);
  $slides.prepend($lastCopy);
}

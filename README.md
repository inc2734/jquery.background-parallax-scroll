# jquery.background-parallax-scroll

## Get started

### Install
```
$ yarn add jquery.background-parallax-scroll
```

### Load scripts

```
<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="/node_modules/jquery.background-parallax-scroll/dist/jquery.background-parallax-scroll.min.js"></script>
<link rel="stylesheet" href="/node_modules/jquery.background-parallax-scroll/dist/jquery.background-parallax-scroll.min.css">
```

### Setting

Parallax fire when `background-attachment: fixed`

```
<script>
jQuery(function($) {
  $('.hero').backgroundParallaxScroll({
    speed: 3 // Optional
  });
});
</script>
```
```
<div class="hero js-bg-parallax">
  <img src="/path/to/bg.jpg" class="js-bg-parallax__bg" alt="">
  <div class="js-bg-parallax__content">
    Contents
  </div>
</div>
```

## License
MIT

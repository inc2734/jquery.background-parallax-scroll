# jquery.background-parallax-scroll

## Get started

### Install
```
$ npm install jquery.background-parallax-scroll
```

### Load scripts

```
<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="/node_modules/jquery.background-parallax-scroll/dist/jquery.background-parallax-scroll.min.js"></script>
<link rel="stylesheet" href="/node_modules/jquery.background-parallax-scroll/dist/jquery.background-parallax-scroll.min.css">
```

### Setting

```
<script>
jQuery(function($) {
  $('.js-bg-parallax').backgroundParallaxScroll({
    speed: 3 // Optional
  });
});
</script>
```
```
<div class="js-bg-parallax">
  <div class="js-bg-parallax__bgimage">
    <img src="/path/to/bg.jpg" alt="">
  </div>
  <div class="js-bg-parallax__content">
    Contents
  </div>
</div>
```

## License
MIT

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
<div class="hero js-bg-parallax" style="background-image: url(/path/to/bg.jpg)">
  Contents
</div>
```

## License
MIT

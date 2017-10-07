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
.hero {
  background-image: url(...);
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;

  @media (min-width: 1024px) {
    background-attachment: fixed;
  }
}
```

## License
MIT

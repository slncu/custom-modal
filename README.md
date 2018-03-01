# custom-modal
## Get Started
Please download the latest version from the release page.([here](https://github.com/slncu/custom-modal/archive/v1.0.0.zip))  
(Sorry I was not a NPM developper. )

```
<script type="text/javascript" src="path/to/bandle.js"></script>
```

## Usage

You create new instance.  
and, `render()` method ignites new Modal. 

```
const modal = new CustomModal();

```
The `selector`'s child elements that you specified are modal's innerText.

```
<div id="modal-id-or-class">
  here is modal message. You can use HTMLCollection.
</div>

modal.render('modal-id-or-class', {
  title: 'modal title',
  btnAgree: 'Next'
});
```


## Options

| Options | Default |
|:------------:|:------------:|
| title | null |
| width | 520 |
| height | 520 |
| btnAgree | 'OK' |
| btnDisagree | null |
| callback | null |

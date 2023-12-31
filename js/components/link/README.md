# LinkComponent

LinkComponent - это пользовательский веб-компонент, представляющий ссылку с поддержкой плавного скроллинга. Компонент может быть настроен с помощью различных атрибутов и генерирует пользовательское событие при нажатии на ссылку.

## Использование

```html
    <link-element href="#section1" link-text="Перейти к разделу 1" is-active="true"></link-element>
```

## Атрибуты

- `href`: Ссылка на элемент на текущей странице. Если элемент существует, страница будет плавно прокручивать до этого элемента при клике по ссылке.

- `link-text`: Текст на ссылке.

- `is-active`: Если установлено значение `true`, ссылка становится активной, и ей добавляется CSS класс `link_active`.

## События

- `events.LINK_CLICKED`: Это событие генерируется при клике на ссылку.


## Методы

Компонент имеет методы жизненного цикла веб компонентов: `connectedCallback`, `attributeChangedCallback` и `disconnectedCallback`.

### `connectedCallback`

Этот метод вызывается, когда компонент добавляется в DOM. В методе компонент прослушивает события и отслеживает изменения атрибутов.

### `attributeChangedCallback(name, oldValue, newValue)`

Этот метод вызывается, когда значения атрибутов компонента меняются.


### `disconnectedCallback()`

Этот метод вызывается перед удалением компонента из DOM и используется для отписки от событий и/или очистки памяти.

## Статические методы

### `#setText(element, newText)`

Устанавливает текст ссылки.

### `#setHref(element, newHref)`

Устанавливает атрибут `href` для ссылки.

### `#setActive(element, isActive)`

Активирует или деактивирует ссылку в зависимости от значения `isActive`. `isActive` должно быть `true` или `false` (строкой).

## Подключение

```javascript
import { LinkComponent } from './link-component.js';
customElements.define(LinkComponent.name, LinkComponent);
```

## Версия

1.0.0
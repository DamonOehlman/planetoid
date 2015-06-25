# planetoid

This is an in-progress helper for working with the [planets.nu](http://planets.nu)
API.


[![NPM](https://nodei.co/npm/planetoid.png)](https://nodei.co/npm/planetoid/)

[![bitHound Score](https://www.bithound.io/github/DamonOehlman/planetoid/badges/score.svg)](https://www.bithound.io/github/DamonOehlman/planetoid) 

## Usage

First install:

```
npm install -g planetoid
```

Then you will be able to retrieve turn data for a game you are currently playing
using the following command:

```
planetoid --username=foo --password=bar --gameid=1234
```

Additionally, you can create an [rc](https://github.com/dominictarr/rc) compatible
configuration file and provide `username` and `password` information there instead.
For example I have on my machine a `~/.config/planetoid` file containing something
similar to the following:

```
username=foo
password=bar
```

## License(s)

### ISC

Copyright (c) 2015, Damon Oehlman <damon.oehlman@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.

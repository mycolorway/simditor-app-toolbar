
class AppToolbar extends SimpleModule

  @className: 'AppToolbar'

  opts:
    bridge: null

  buttons:
    '|':
      name: '|'
      type: 'separator'
    bold:
      name: 'bold'
      type: 'toggle'
      code: '\uF032'
    italic:
      name: 'italic'
      type: 'toggle'
      code: '\uF033'
    underline:
      name: 'underline'
      type: 'toggle'
      code: '\uF0cd'
    strikethrough:
      name: 'strikethrough'
      type: 'toggle'
      code: '\uF0cc'
    ol:
      name: 'ol'
      type: 'toggle'
      code: '\uF0cb'
    ul:
      name: 'ul'
      type: 'toggle'
      code: '\uF0ca'
    blockquote:
      name: 'blockquote'
      type: 'toggle'
      code: '\uF10d'
    hr:
      name: 'hr'
      type: 'toggle'
      code: '\uF068'

  _init: ->
    @editor = @_module
    @bridge = @editor.opts.bridge
    return unless @editor.opts.toolbar and @bridge

    @config = []

    $.each @editor.opts.toolbar, (i, name) =>
      @config.push @buttons[name] if @buttons[name]

    @editor.on 'focus', (e) =>
      @bridge.callHandler 'showSimditorToolbar',
        id: @editor.id
        buttons: @config

    @editor.toolbar.on 'buttonstatus', (e, button) =>
      @bridge.callHandler 'updateSimditorButton',
        name: button.name
        enable: !button.disabled
        selected: button.active

    @bridge.registerHandler 'doSimditorCommand', (name) =>
      button = @editor.toolbar.findButton name
      button.command()


Simditor.connect AppToolbar




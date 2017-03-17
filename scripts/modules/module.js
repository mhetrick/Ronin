function Module(rune)
{
  this.rune = rune;
  this.element = null;
  this.parameters = [];
  this.variables  = {};
  this.layer = null;

  this.docs = "Missing documentation.";
  
  this.install = function()
  {
    console.log("Installing "+ronin.modules[this.rune].constructor.name);
  }

  this.create_layer = function()
  {
    this.layer = new Layer(this.constructor.name+".Preview",this);
    this.layer.element.setAttribute("style","z-index:7000");
    ronin.surface.add_layer(this.layer);
  }

  this.select_layer = function()
  {
    if(!this.layer){ this.create_layer(); }
    return this.layer;
  }

  this.active = function(cmd)
  {
  }
  
  this.passive = function(cmd)
  {
  }
  
  this.set_variables = function(cmd)
  {
    for (var key in this.variables){
      if(!cmd.variable(key)){ continue; }
      this.variables[key] = cmd.variable(key).value;
      ronin.terminal.log(new Log(this,"Updated "+key+" with "+cmd.variable(key).value));
    }
  }
  
  this.hint = function(content)
  {
    var h = "<span class='name'>"+ronin.module.constructor.name+"</span> ";
    for(param in ronin.module.parameters){
      var name = new ronin.module.parameters[param]().constructor.name;
      h += name+" ";
    }
    for(variable in ronin.module.variables){
      h += variable+"="+ronin.module.variables[variable]+" ";
    }

    h += ronin.module.mouse_mode() ? "<i>"+ronin.module.mouse_mode()+"</i>" : "";

    return this.pad(content)+h;    
  }

  this.pad = function(input)
  {
    var s = "";
    for (i = 0; i < input.length+1; i++){
      s += "_";
    }
    return "<span style='color:#000'>"+s+"</span>";
  }
  
  this.widget = function()
  {
    return "";
  }

  // Mouse

  this.mouse_mode = function()
  {
    return null;
  }

  this.mouse_from = null;
  this.mouse_held = null;
  this.mouse_prev = null;
  
  this.mouse_down = function(position)
  {
  }
  
  this.mouse_move = function(position,rect)
  {
  }
  
  this.mouse_up = function(position,rect)
  {
  }

  // Keyboard

  this.key_escape = function()
  { 
  }

  this.key_delete = function()
  {
  }

  this.key_arrow_up = function()
  { 
    ronin.surface.layer_up();
  }

  this.key_arrow_down = function()
  { 
    ronin.surface.layer_down();
  }

  this.key_arrow_left = function()
  { 
  }

  this.key_arrow_right = function()
  { 
  }
}
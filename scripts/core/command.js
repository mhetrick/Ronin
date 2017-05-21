function Command(content)
{
  this.content = content;
  this.parts   = content.split(" ");

  this.module_name = null;
  this.method_name = null;
  this.setting_name = null;
  this.module = null;
  this.setthing = null;

  this.module = function()
  {
    var module_name = null;
    if(content.indexOf(".") > -1){
      module_name = content.split(" ")[0].split(".")[0]
    }
    else if(content.indexOf(":") > -1){
      module_name = content.split(" ")[0].split(":")[0]
    }
    else{
      module_name = content.split(" ")[0];
    }
    return ronin.modules[module_name] ? ronin.modules[module_name] : null;
  }

  this.method = function()
  {
    var module = this.module();
    if(!module){ return null; }

    var method_name = content.indexOf(".") > -1 ? content.split(" ")[0].split(".")[1] : "default";
    return module.methods[method_name] ? module.methods[method_name] : null;
  }

  this.params = function()
  {
    var a = this.content.split(" ");
    a.shift();
    return a.join(" ").trim();
  }


  this.inject_position = function(injection)
  {
    console.log("> "+injection);
    console.log("- "+content);
  }
  
  // Parser
  
  this.any = function()
  {
    return new Any(this.content);
  }
  
  this.rect = function()
  {
    for (i = 0; i < this.parts.length; i++) {
      if(this.parts[i].indexOf("x") >= 0 && this.parts[i].indexOf("/") < 0){ return new Rect(this.parts[i]); }
    }
    return null;
  }
  
  this.position = function()
  {
    for (i = 0; i < this.parts.length; i++) {
      if(this.parts[i].indexOf(",") >= 0){ return new Position(this.parts[i]); }
    }
    return null;
  }
  
  this.color = function()
  {
    for (i = 0; i < this.parts.length; i++) {
      if(this.parts[i].indexOf("#") >= 0){ return new Color(this.parts[i]); }
    }
    return null;
  }
  
  this.filepath = function()
  {
    for (i = 0; i < this.parts.length; i++) {
      if(this.parts[i].indexOf("/") >= 0){ return new Filepath(this.parts[i]); }
    }
    return null;
  }
  
  this.value = function()
  {
    for (i = 0; i < this.parts.length; i++) {
      var test = /[^$\-\d]/.test(this.parts[i]);
      if(!test && this.parts[i] !== ""){ return new Value(this.parts[i]); }
    }
    return null;
  }
  
  this.range = function()
  {
    for (i = 0; i < this.parts.length; i++) {
      if(this.parts[i].indexOf("..") >= 0){ return new Range(this.parts[i]); }
    }
    return null;
  }
  
  this.bang = function()
  {
    for (i = 0; i < this.parts.length; i++) {
      if(this.parts[i].indexOf("!") >= 0){ return new Bang(); }
    }
    return null;
  }
  
  this.angle = function()
  {
    for (i = 0; i < this.parts.length; i++) {
      if(this.parts[i].indexOf("'") >= 0){ return new Angle(this.parts[i]); }
    }
    return null;
  }
  
  this.setting = function(name)
  {
    for (i = 0; i < this.parts.length; i++) {
      if(this.parts[i].indexOf("=") >= 0){
        var parts = this.parts[i].split("=");
        if(parts[0] == name){
          return new Setting(parts[0],parts[1]);
        }
      }
    }
    return null;
  }

  this.text = function()
  {
    var content_str = this.parts.join(" ");
    if(content_str.indexOf("\"") < 0){ return null; }
    return content_str.split("\"")[1];
  }
}
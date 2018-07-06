'use strict';

var IncludeHTML = function () {
  var SYNTAX_REGX = /include(\s+([^\s]+))+/;
  var ROOT_ELEMENT = document.documentElement;

  function MyPromise(fn, prevPromise) {
    var self = this;
  
    self.prevPromise = prevPromise;
    self.fn = fn;
    self.resolved = false;
    self.result = undefined;
  
    self.then = function(fn) {
      self.next = new MyPromise(fn, self);
      
      if (self.resolved) {
        self.next._run(self.result);
      }
      return self.next;
    }
  
    self._run = function(result) {
      var returnValue = self.fn(result);
      if (returnValue instanceof MyPromise) {
        returnValue.then(self._resolve);
      } else {
        self._resolve(returnValue);
      }
    }
  
    self._resolve = function(result) {
      self.resolved = true;
      self.result = result;
      if (self.next) {
        self.next._run(result);
      }
    }
  
    if (!self.prevPromise) {
      self.fn(self._resolve);
    }
  }

  MyPromise.all = function(promises) {
    return new MyPromise(function(resolve) {
      var results = [];
      
      var success = function(result, index) {
        results[index] = result;
        if (results.length === promises.length) resolve(results);
      };

      promises.forEach(function(promise, index) {
        promise.then(function(result) {
          success(result, index);
        });
      });
    });
  }
  
  function request(url) {
    return new MyPromise(function(resolve) {
      var client = new XMLHttpRequest();
      client.onload = function() {
        resolve(this.response);
      }
      client.open('get', url, true);
      client.send();
    });
  }
  
  var klass = function(node) {
    this.node = node;
    this.parentNode = node.parentNode;
    this.options = klass.extractOptions(node);
  }
  
  klass.prototype.load = function() {
    var self = this;
  
    return request(this.options.url).then(function(html) {
      var tpl = document.createElement('template');
      tpl.innerHTML = html;
      self.parentNode.replaceChild(tpl.content, self.node);      
      return tpl;
    });
  }

  klass.nodeValidator = function(node) {
    if (SYNTAX_REGX.exec(node.nodeValue)) {
      return NodeFilter.FILTER_ACCEPT;
    } else {
      return NodeFilter.FILTER_REJECT;
    }
  }

  klass.extractOptions = function(node) {
    var options = node.nodeValue
      .replace(/^\s+include\s+/,'')
      .replace(/\s+/g, ' ')
      .split(' ');
    
    var url = options.shift();

    return {
      url: url,
      directives: options,
    }
  }

  klass.queryNodes = function(rootEl) {
    var nextNode, nodes = [];
    var iterator = document.createNodeIterator(rootEl, NodeFilter.SHOW_COMMENT, klass.nodeValidator);
    while (nextNode = iterator.nextNode()) {
      nodes.push(nextNode);
    }
    return nodes;
  }

  klass.load = function(rootEl) {
    rootEl = rootEl instanceof HTMLElement ? rootEl : ROOT_ELEMENT;
    var promises = klass.queryNodes(rootEl).map(function(node) {  
      return new klass(node).load();
    });

    if (promises.length) {
      MyPromise.all(promises).then(klass.load);
    } else {
      document.documentElement.classList.add('include-html-loaded');
    }
  }

  return klass;
}();

document.addEventListener('DOMContentLoaded', IncludeHTML.load);
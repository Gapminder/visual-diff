var BUBBLE_MODEL = {
  "state": {
    "entities": {
      "dim": "geo",
      "filter": {
        "un_state": true
      },
      "show": {}
    },
    "entities_colorlegend": {
      "dim": "world_4region"
    },
    "entities_tags": {
      "dim": "tag"
    },
    "time": {
      "dim": "time"
    },
    "marker": {
      "space": ["entities", "time"],
      "label": {
        "use": "property",
        "which": "name"
      },
      "axis_y": {
        "use": "indicator",
        "which": "life_expectancy_years",
        "zoomedMin": 19,
        "zoomedMax": 86,
        "domainMin": 0,
        "domainMax": 100
      },
      "axis_x": {
        "use": "indicator",
        "scaleType": "log",
        "domainMax": 180000,
        "domainMin": 300,
        "zoomedMax": 150000,
        "zoomedMin": 400,
        "which": "income_per_person_gdppercapita_ppp_inflation_adjusted"
      },
      "size": {
        "use": "indicator",
        "which": "population_total",
        "domainMin": 15,
        "domainMax": 1400000000,
        "scaleType": "linear",
        "allow": {
          "scales": ["linear"]
        }
      },
      "color": {
        "use": "property",
        "which": "world_4region",
        "scaleType": "ordinal",
        "syncModels": ["marker_colorlegend"]
      }
    },
    "marker_colorlegend":{
      "space": ["entities_colorlegend"],
      "opacityRegular": 0.8,
      "opacityHighlightDim": 0.3,
      "label": {
        "use": "property",
        "which": "name"
      },
      "hook_rank": {
        "use": "property",
        "which": "rank"
      },
      "hook_geoshape": {
        "use": "property",
        "which": "shape_lores_svg"
      }
    },
    "marker_tags": {
      "space": ["entities_tags"],
      "label": {
        "use": "property",
        "which": "name"
      },
      "hook_parent": {
        "use": "property",
        "which": "parent"
      }
    }
  },
  "ui": {
    "datawarning": {
      "doubtDomain": [1800, 1950, 2015],
      "doubtRange": [1.0, 0.3, 0.2]
    },
    "splash": true
  },
  "data_alternative": {
    "reader": "waffle",
    "dataset": "open-numbers/ddf--gapminder--systema_globalis#stage",
    "path": "https://waffle-server-dev.gapminderdev.org/api/ddf/ql/"
  },
  "data": {
    "reader": "waffle",
    "dataset": "open-numbers/ddf--gapminder--systema_globalis#develop",
    "path": "https://waffle-server-dev.gapminderdev.org/api/ddf/ql/"
  }
};


var LINE_MODEL = {
  "state": {
    "time": {
      "startOrigin": "2000",
      "value": "2017",
      "dim": "time"
    },
    "entities": {
      "dim": "geo",
      "filter": {
        "un_state": true
      },
      "show": {}
    },
    "entities_colorlegend": { 
      "dim": "world_4region"
    },
    "marker": {
      "space": ["entities", "time"],
      "label": {
        "use": "property",
        "which": "name"
      },
      "axis_y": {
        "use": "indicator",
        "which": "life_expectancy_years"
      },
      "axis_x": {
        "use": "indicator",
        "which": "time",
        "scaleType": "time"
      },
      "color": {
        "use": "property",
        "which": "world_4region",
        "scaleType": "ordinal",
        "allow": {
          "scales": ["ordinal"]
        },
        "syncModels": ["marker_colorlegend"]
      }
    },
    "entities_tags": {
      "dim": "tag"
    },
    "marker_colorlegend": {
      "space": ["entities_colorlegend"],
      "opacityRegular": 0.8,
      "opacityHighlightDim": 0.3, 
      "label": {
        "use": "property",
        "which": "name"
      },
      "hook_rank": {
        "use": "property",
        "which": "rank"
      },
      "hook_geoshape": {
        "use": "property",
        "which": "shape_lores_svg"
      }
    },
    "marker_tags": {
      "space": ["entities_tags"],
      "label": {
        "use": "property",
        "which": "name"
      },
      "hook_parent": {
        "use": "property",
        "which": "parent"
      }
    }
  },
  "ui": {
    "datawarning": {
      "doubtDomain": [1800, 1950, 2015],
      "doubtRange": [1.0, 0.3, 0.2]
    },
    "splash": false
  },
  "data": {
    "reader": "waffle",
    "dataset": "open-numbers/ddf--gapminder--systema_globalis#develop",
    "path": "https://waffle-server-dev.gapminderdev.org/api/ddf/ql/"
  }
};



//WS reader integration
var wsReader = WsReader.WsReader.getReader();
Vizabi.Reader.extend("waffle", wsReader);

var viz1 = Vizabi('BubbleChart', document.getElementById('placeholder-bubble'), BUBBLE_MODEL);
var viz2 = Vizabi('LineChart', document.getElementById('placeholder-line'), LINE_MODEL);

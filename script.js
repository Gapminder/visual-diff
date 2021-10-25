var urlParams = new URLSearchParams(window.location.search)
var OLD_DATASET = urlParams.get("olddata") || "wdi-master";
var NEW_DATASET = urlParams.get("newdata") || "wdi-develop";


function insertUrlParam(key, value) {
    if (history.pushState) {
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.set(key, value);
        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
        window.history.pushState({path: newurl}, '', newurl);
    }
}

insertUrlParam("olddata",OLD_DATASET);
insertUrlParam("newdata",NEW_DATASET);

var BUBBLE_MODEL = {
  model: {
    dataSources: {
      olddata: {
        modelType: "bw",
        service: "https://big-waffle.gapminder.org",
        dataset: NEW_DATASET,
        name: NEW_DATASET
      },
      newdata: {
        modelType: "bw",
        service: "https://big-waffle.gapminder.org",
        dataset: OLD_DATASET,
        name: OLD_DATASET
      },
      sg: {
        modelType: "bw",
        service: "https://big-waffle.gapminder.org",
        dataset: "sg-master",
        name: "sg-master"
      }
    },
    markers: {
      bubble: {
        requiredEncodings: ["x", "y", "size"],
        data: {
          source: "sg",
          space: ["country", "time"],
          filter: {
            dimensions: { "country": { "un_state": true } }
          }
        },
        encoding: {
          "selected": {
            modelType: "selection",
            data: {
              filter: {
                ref: "markers.bubble.encoding.trail.data.filter"
              }
            }
          },
          "highlighted": {
            modelType: "selection"
          },
          "superhighlighted": {
            modelType: "selection"
          },
          "order": {
            modelType: "order",
            direction: "desc",
            data: {
              ref: "markers.bubble.config.encoding.size.data"
            }
          },
          "size": {
            data: {
              concept: "population_total"
            },
            scale: {
              modelType: "size",
              allowedTypes: ["linear", "log", "genericLog", "pow", "point"]
            }
          },
          "y": {
            data: {
              source: "newdata"
            },
            scale: {
              allowedTypes: ["linear", "log", "genericLog", "pow", "time"]
            }
          },
          "x": {
            data: {
              source: "olddata"
            },
            scale: {
              allowedTypes: ["linear", "log", "genericLog", "pow", "time"]
            }
          },
          "color": {
            data: {
              space: ["country"],
              concept: "world_4region"
            },
            scale: {
              modelType: "color",
              type: "ordinal"
            }
          },
          "label": {
            data: {
              modelType: "entityPropertyDataConfig",
              concept: "name"
            }
          },
          "size_label": {
            data: {
              constant: "_default"
            },
            scale: {
              modelType: "size",
              allowedTypes: ["linear", "log", "genericLog", "pow", "point", "ordinal"]
            }
          },
          frame: {
            modelType: "frame",
            speed: 200,
            value: "2019",
            splash: true,
            data: {
              concept: "time"
            }
          },
          "trail": {
            modelType: "trail",
            groupDim: "time",
            show: true
          },
          "repeat": {
            modelType: "repeat",
            row: ["y"],
            column: ["x"],
            allowEnc: ["y", "x"]
          }
        }
      },
      "legend": {
        data: {
          ref: {
            transform: "entityConceptSkipFilter",
            path: "markers.bubble.encoding.color"
          }
        },
        encoding: {
          color: {
            data: {
              concept: { ref: "markers.bubble.encoding.color.data.concept" },
              constant: { ref: "markers.bubble.encoding.color.data.constant" }
            },
            scale: {
              modelType: "color",
              palette: { ref: "markers.bubble.encoding.color.scale.palette" },
              domain: null,
              range: null,
              type: null,
              zoomed: null,
              zeroBaseline: false,
              clamp: false,
              allowedTypes: null
            }
            //scale: { ref: "markers.bubble.encoding.color.scale" }
          },
          name: { data: { concept: "name" } },
          rank: { data: { concept: "rank" } },
          map: { data: { concept: "shape_lores_svg" } }
        }
      },
    }
  },
  ui: {
    locale: { id: "en", placeholder: '#placeholder-bubble'  },
    layout: { projector: false, placeholder: '#placeholder-bubble'  },

    //ui
    "buttons": {
      "buttons": ["colors", "find", "trails", "moreoptions", "presentation", "sidebarcollapse", "fullscreen"]
    },
    "dialogs": {
      "dialogs": {
        "popup": ["colors", "find", "moreoptions"],
        "sidebar": ["colors", "find", "size", "zoom"],
        "moreoptions": [
          "opacity",
          "speed",
          "axes",
          "size",
          "colors",
          "label",
          "zoom",
          "technical",
          "repeat",
          "presentation",
          "about"
        ]
      },
      "find": {
        enableSelectShowSwitch: false,
        enableMarkerSpaceOptions: false,
      }
    },


    "chart": {
      show_ticks: true,
      showForecast: false,
      showForecastOverlay: true,
      pauseBeforeForecast: true,
      endBeforeForecast: "2019",
      opacityHighlight: 1.0,
      opacitySelect: 1.0,
      opacityHighlightDim: 0.1,
      opacitySelectDim: 0.3,
      opacityRegular: 0.8,
      timeInBackground: true,
      timeInTrails: true,
      lockNonSelected: 0,
      numberFormatSIPrefix: true,
      panWithArrow: false,
      adaptMinMaxZoom: false,
      cursorMode: "arrow",
      zoomOnScrolling: false,
      superhighlightOnMinimapHover: true,
      whenHovering: {
        showProjectionLineX: true,
        showProjectionLineY: true,
        higlightValueX: true,
        higlightValueY: true
      },
      labels: {
        enabled: true,
        dragging: true,
        removeLabelBox: false
      },
      margin: {
        left: 0,
        top: 0
      },
      decorations: {
        "enabled": true,
        "xAxisGroups": {
          "income_per_person_gdppercapita_ppp_inflation_adjusted": [
            { "min": null, "max": 2650, "label": "incomegroups/level1", "label_short": "incomegroups/level1short" },
            { "min": 2650, "max": 8000, "label": "incomegroups/level2", "label_short": "incomegroups/level2short" },
            { "min": 8000, "max": 24200, "label": "incomegroups/level3", "label_short": "incomegroups/level3short" },
            { "min": 24200, "max": null, "label": "incomegroups/level4", "label_short": "incomegroups/level4short" }
          ]
        }
      }
    },
    "data-warning": {
      doubtDomain: [1800, 1950, 2015],
      doubtRange: [1.0, 0.3, 0.2]
    },
    "tree-menu": {
      "showDataSources": false,
      "folderStrategyByDataset": {
        "sg": "folder:other_datasets",
        "newdata": "folder:newdata",
        "olddata": "folder:olddata"
      }
    }
  }
};


var LINE_MODEL = {
  model: {
    dataSources: {
      newdata: {
        modelType: "bw",
        service: "https://big-waffle.gapminder.org",
        dataset: NEW_DATASET,
        name: NEW_DATASET
      },
      sg: {
        modelType: "bw",
        service: "https://big-waffle.gapminder.org",
        dataset: "sg-master",
        name: "sg-master"
      }
    },
    markers: {
      line: {
        requiredEncodings: ["x", "y"],
        data: {
          source: "sg",
          space: ["country", "time"]
        },
        encoding: {
          "unstate": {
            data: {
              space: ["country"],
              concept: "un_state"
            }
          },
          "selected": {
            modelType: "selection"
          },
          "highlighted": {
            modelType: "selection"
          },
          "y": {
            data: {
              source: "newdata"
            },
            scale: {
              allowedTypes: ["linear", "log", "genericLog", "pow"]
            }
          },
          "x": {
            data: {
              concept: "time"
            },
            scale: {
              type: "time",
              allowedTypes: ["linear", "log", "genericLog", "pow", "time"]
            }
          },
          "color": {
            data: {
              allow: {
                space: {
                  filter: {
                    concept_type: { $ne: "time" }
                  }
                }
              },
              space: ["country"],
              concept: "world_4region"
            },
            scale: {
              modelType: "color",
              type: "ordinal"
            }
          },
          "label": {
            data: {
              modelType: "entityPropertyDataConfig",
              concept: "name"
            }
          },
          frame: {
            modelType: "frame",
            speed: 200,
            value: "2019",
            data: {
              concept: "time"
            }
          },
          "repeat": {
            modelType: "repeat",
            allowEnc: ["y", "x"]
          },
          "facet": {
            modelType: "facet",
            row: "country"
          }
        }
      },
      "legend": {
        data: {
          ref: {
            transform: "entityConceptSkipFilter",
            path: "markers.line.encoding.color"
          }
        },
        encoding: {
          color: {
            data: {
              concept: { ref: "markers.line.encoding.color.data.concept" },
              constant: { ref: "markers.line.encoding.color.data.constant" }
            },
            scale: {
              modelType: "color",
              palette: { ref: "markers.line.encoding.color.scale.palette" },
              domain: null,
              range: null,
              type: null,
              zoomed: null,
              zeroBaseline: false,
              clamp: false,
              allowedTypes: null
            }
            //scale: { ref: "markers.line.encoding.color.scale" }
          },
          name: { data: { concept: "name" } },
          rank: { data: { concept: "rank" } },
          map: { data: { concept: "shape_lores_svg" } }
        }
      }
    }
  },
  ui: {
    locale: { id: "en", placeholder: '#placeholder-line' },
    layout: { projector: false, placeholder: '#placeholder-line' },

    //ui
    "time-slider": {
      "show_value": true
    },
    "buttons": {
      "buttons": ["colors", "find", "moreoptions", "presentation", "sidebarcollapse", "fullscreen"],
    },
    "dialogs": {
      "dialogs": {
        "popup": ["colors", "find", "moreoptions"],
        "sidebar": ["colors", "find"],
        "moreoptions": ["opacity", "speed", "colors", "axes", "technical", "repeat", "presentation", "about"]
      },
      "find": {
        "panelMode": "show",
        "showTabs": {
          "country": "open fully"
        }
      }
    },
    chart: {
      showForecast: false,
      showForecastOverlay: true,
      pauseBeforeForecast: true,
      endBeforeForecast: "2019",
      opacityHighlight: 1.0,
      opacitySelect: 1.0,
      opacityHighlightDim: 0.1,
      opacitySelectDim: 0.3,
      opacityRegular: 0.8,
      hideXAxisValue: false,
      curve: "curveMonotoneX",
      whenHovering: {
        showTooltip: false,
        hideVerticalNow: false,
        showProjectionLineX: false,
        showProjectionLineY: false,
        higlightValueX: false,
        higlightValueY: false
      },
      labels: {
        min_number_of_entities_when_values_hide: 3,
      }
    },
    "data-warning": {
      doubtDomain: [1800, 1950, 2015],
      doubtRange: [1.0, 0.3, 0.2]
    },
    "tree-menu": {
      "showDataSources": false,
      "folderStrategyByDataset": {
        "sg": "folder:other_datasets",
        "newdata": "folder:newdata",
        "olddata": "folder:olddata"
      }
    }
  }
};




var ddfcsv = new DDFCsvReader.getDDFCsvReaderObject();
var ddfReader = DDFServiceReader.getReader();
Vizabi.stores.dataSources.createAndAddType('ddfcsv', ddfcsv);
Vizabi.stores.dataSources.createAndAddType('bw', ddfReader);
window.Vizabi = Vizabi;
window.autorun = mobx.autorun;

const bubblemodel = Vizabi(BUBBLE_MODEL.model);

const linemodel = Vizabi(LINE_MODEL.model);

vizbubble = new BubbleChart({
  Vizabi,
  placeholder: '#placeholder-bubble',
  model: bubblemodel,
  locale: BUBBLE_MODEL.ui.locale,
  layout: BUBBLE_MODEL.ui.layout,
  ui: BUBBLE_MODEL.ui,
  default_ui: BUBBLE_MODEL.ui,
  options: {
    showLoading: false
  }
});

vizLine = new LineChart({
  Vizabi,
  placeholder: '#placeholder-line',
  model: linemodel,
  locale: LINE_MODEL.ui.locale,
  layout: LINE_MODEL.ui.layout,
  ui: LINE_MODEL.ui,
  default_ui: LINE_MODEL.ui,
  options: {
    showLoading: false
  }
});

setTimeout(()=>{
  mobx.autorun(()=>{
    const concept = vizLine.model.markers.line.encoding.y.data.concept;
    vizbubble.model.markers.bubble.encoding.x.data.config.concept = concept;
    vizbubble.model.markers.bubble.encoding.y.data.config.concept = concept;
  })
},3000)


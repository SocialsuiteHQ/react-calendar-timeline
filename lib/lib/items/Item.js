'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _interact = require('interact.js');

var _interact2 = _interopRequireDefault(_interact);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _generic = require('../utility/generic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_Component) {
  _inherits(Item, _Component);

  function Item(props) {
    _classCallCheck(this, Item);

    var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

    _this.onMouseDown = function () {
      return _this.__onMouseDown__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onMouseUp = function () {
      return _this.__onMouseUp__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onTouchStart = function () {
      return _this.__onTouchStart__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onTouchEnd = function () {
      return _this.__onTouchEnd__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleDoubleClick = function () {
      return _this.__handleDoubleClick__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleContextMenu = function () {
      return _this.__handleContextMenu__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.cacheDataFromProps(props);

    _this.state = {
      interactMounted: false,

      dragging: null,
      dragStartPos: null, // holding x,y position when draging
      dragTime: null,
      dragGroupDelta: null,

      resizing: null,
      resizeEdge: null,
      resizeStart: null,
      resizeTime: null
    };
    return _this;
  }
  // removed prop type check for SPEED!
  // they are coming from a trusted component anyway
  // (this complicates performance debugging otherwise)


  _createClass(Item, [{
    key: '__handleContextMenu__REACT_HOT_LOADER__',
    value: function __handleContextMenu__REACT_HOT_LOADER__(e) {
      if (this.props.onContextMenu) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onContextMenu(this.itemId, e);
      }
    }
  }, {
    key: '__handleDoubleClick__REACT_HOT_LOADER__',
    value: function __handleDoubleClick__REACT_HOT_LOADER__(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.props.onItemDoubleClick) {
        this.props.onItemDoubleClick(this.itemId, e);
      }
    }
  }, {
    key: '__onTouchEnd__REACT_HOT_LOADER__',
    value: function __onTouchEnd__REACT_HOT_LOADER__(e) {
      if (!this.state.interactMounted && this.startedTouching) {
        this.startedTouching = false;
        this.actualClick(e, 'touch');
      }
    }
  }, {
    key: '__onTouchStart__REACT_HOT_LOADER__',
    value: function __onTouchStart__REACT_HOT_LOADER__(e) {
      if (!this.state.interactMounted) {
        e.preventDefault();
        this.startedTouching = true;
      }
    }
  }, {
    key: '__onMouseUp__REACT_HOT_LOADER__',
    value: function __onMouseUp__REACT_HOT_LOADER__(e) {
      if (!this.state.interactMounted && this.startedClicking) {
        this.startedClicking = false;
        this.actualClick(e, 'click');
      }
    }
  }, {
    key: '__onMouseDown__REACT_HOT_LOADER__',
    value: function __onMouseDown__REACT_HOT_LOADER__(e) {
      if (!this.state.interactMounted) {
        e.preventDefault();
        this.startedClicking = true;
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var shouldUpdate = nextState.dragging !== this.state.dragging || nextState.dragTime !== this.state.dragTime || nextState.dragGroupDelta !== this.state.dragGroupDelta || nextState.resizing !== this.state.resizing || nextState.resizeTime !== this.state.resizeTime || nextProps.keys !== this.props.keys || !(0, _generic.deepObjectCompare)(nextProps.itemProps, this.props.itemProps) || nextProps.selected !== this.props.selected || nextProps.item !== this.props.item || nextProps.canvasTimeStart !== this.props.canvasTimeStart || nextProps.canvasTimeEnd !== this.props.canvasTimeEnd || nextProps.canvasWidth !== this.props.canvasWidth || nextProps.order !== this.props.order || nextProps.dragSnap !== this.props.dragSnap || nextProps.minResizeWidth !== this.props.minResizeWidth || nextProps.canChangeGroup !== this.props.canChangeGroup || nextProps.canSelect !== this.props.canSelect || nextProps.topOffset !== this.props.topOffset || nextProps.canMove !== this.props.canMove || nextProps.canResizeLeft !== this.props.canResizeLeft || nextProps.canResizeRight !== this.props.canResizeRight || nextProps.dimensions !== this.props.dimensions;
      return shouldUpdate;
    }
  }, {
    key: 'cacheDataFromProps',
    value: function cacheDataFromProps(props) {
      this.itemId = (0, _generic._get)(props.item, props.keys.itemIdKey);
      this.itemTitle = (0, _generic._get)(props.item, props.keys.itemTitleKey);
      this.itemDivTitle = props.keys.itemDivTitleKey ? (0, _generic._get)(props.item, props.keys.itemDivTitleKey) : this.itemTitle;
      this.itemTimeStart = (0, _generic._get)(props.item, props.keys.itemTimeStartKey);
      this.itemTimeEnd = (0, _generic._get)(props.item, props.keys.itemTimeEndKey);
    }

    // TODO: this is same as coordinateToTimeRatio in utilities

  }, {
    key: 'coordinateToTimeRatio',
    value: function coordinateToTimeRatio() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      return (props.canvasTimeEnd - props.canvasTimeStart) / props.canvasWidth;
    }
  }, {
    key: 'dragTimeSnap',
    value: function dragTimeSnap(dragTime, considerOffset) {
      var dragSnap = this.props.dragSnap;

      if (dragSnap) {
        var offset = considerOffset ? (0, _moment2.default)().utcOffset() * 60 * 1000 : 0;
        return Math.round(dragTime / dragSnap) * dragSnap - offset % dragSnap;
      } else {
        return dragTime;
      }
    }
  }, {
    key: 'resizeTimeSnap',
    value: function resizeTimeSnap(dragTime) {
      var dragSnap = this.props.dragSnap;

      if (dragSnap) {
        var endTime = this.itemTimeEnd % dragSnap;
        return Math.round((dragTime - endTime) / dragSnap) * dragSnap + endTime;
      } else {
        return dragTime;
      }
    }
  }, {
    key: 'dragstart',
    value: function dragstart(e) {
      if (this.props.onDragStart) {
        this.props.onDragStart(this.itemId);
      }
      this.setState({
        dragging: true,
        dragStartPos: { x: e.pageX, y: e.pageY },
        dragGroupDelta: 0
      });
    }
  }, {
    key: 'dragmove',
    value: function dragmove(e) {
      var _props = this.props,
          onDrag = _props.onDrag,
          dragSnap = _props.dragSnap,
          item = _props.item;

      var dragTimeDelta = this.dragTimeDelta(e);
      var dragGroupDelta = this.dragGroupDelta(e);

      if (this.props.moveResizeValidator) {
        dragTimeDelta = this.props.moveResizeValidator('move', item, this.itemTimeStart + dragTimeDelta) - this.itemTimeStart;
      } else {
        dragTimeDelta = Math.round((this.itemTimeStart + dragTimeDelta) / dragSnap) * dragSnap - this.itemTimeStart;
      }

      if (onDrag) {
        onDrag(item, dragTimeDelta, this.props.order, dragGroupDelta);
      }

      this.setState({
        dragTimeDelta: dragTimeDelta,
        dragGroupDelta: dragGroupDelta
      });
    }
  }, {
    key: 'dragend',
    value: function dragend(e) {
      var _props2 = this.props,
          onDrop = _props2.onDrop,
          item = _props2.item;


      if (onDrop) {
        onDrop(item, this.state.dragTimeDelta, this.props.order, this.state.dragGroupDelta);
      }

      this.setState({
        dragging: false,
        dragTimeDelta: 0,
        dragGroupDelta: null
      });
    }
  }, {
    key: 'dragTimeDelta',
    value: function dragTimeDelta(e) {
      if (!this.state.dragging) {
        return 0;
      }
      var deltaX = e.pageX - this.state.dragStartPos.x;
      return deltaX * this.coordinateToTimeRatio();
    }
  }, {
    key: 'dragTime',
    value: function dragTime(e) {
      var startTime = this.itemTimeStart;

      if (this.state.dragging) {
        var deltaX = e.pageX - this.state.dragStartPos.x;
        var timeDelta = deltaX * this.coordinateToTimeRatio();

        return this.dragTimeSnap(startTime + timeDelta, true);
      } else {
        return startTime;
      }
    }
  }, {
    key: 'dragGroupDelta',
    value: function dragGroupDelta(e) {
      var _props3 = this.props,
          groupTops = _props3.groupTops,
          order = _props3.order,
          topOffset = _props3.topOffset;

      if (this.state.dragging && this.props.canChangeGroup) {
        var groupDelta = 0;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.keys(groupTops)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            var item = groupTops[key];
            if (e.pageY - topOffset > item) {
              groupDelta = parseInt(key, 10) - order;
            } else {
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (this.props.order + groupDelta < 0) {
          groupDelta = 0 - this.props.order;
        }
        return groupDelta;
      } else {
        return 0;
      }
    }
  }, {
    key: 'resizeTimeDelta',
    value: function resizeTimeDelta(e, resizeEdge) {
      var dragSnap = this.props.dragSnap;

      var length = this.itemTimeEnd - this.itemTimeStart;
      var timeDelta = this.dragTimeSnap((e.pageX - this.state.resizeStart) * this.coordinateToTimeRatio());

      if (length + (resizeEdge === 'left' ? -timeDelta : timeDelta) < (dragSnap || 1000)) {
        if (resizeEdge === 'left') {
          return length - (dragSnap || 1000);
        } else {
          return (dragSnap || 1000) - length;
        }
      } else {
        return timeDelta;
      }
    }
  }, {
    key: 'mountInteract',
    value: function mountInteract() {
      var _this2 = this;

      var leftResize = this.props.useResizeHandle ? this.dragLeft : true;
      var rightResize = this.props.useResizeHandle ? this.dragRight : true;

      (0, _interact2.default)(this.item).resizable({
        edges: {
          left: this.canResizeLeft() && leftResize,
          right: this.canResizeRight() && rightResize,
          top: false,
          bottom: false
        },
        enabled: this.props.selected && (this.canResizeLeft() || this.canResizeRight())
      }).draggable({
        enabled: this.props.selected
      }).styleCursor(false).on('dragstart', function (e) {
        if (_this2.props.selected) {
          _this2.dragstart(e);
        } else {
          return false;
        }
      }).on('dragmove', function (e) {
        if (_this2.state.dragging) {
          _this2.dragmove(e);
        }
      }).on('dragend', function (e) {
        if (_this2.state.dragging) {
          _this2.dragend(e);
        }
      }).on('resizestart', function (e) {
        if (_this2.props.selected) {
          _this2.setState({
            resizing: true,
            resizeEdge: null, // we don't know yet
            resizeStart: e.pageX,
            resizeTime: 0
          });
        } else {
          return false;
        }
      }).on('resizemove', function (e) {
        if (_this2.state.resizing) {
          var resizeEdge = _this2.state.resizeEdge;

          if (!resizeEdge) {
            resizeEdge = e.deltaRect.left !== 0 ? 'left' : 'right';
            _this2.setState({ resizeEdge: resizeEdge });
          }
          var time = resizeEdge === 'left' ? _this2.itemTimeStart : _this2.itemTimeEnd;

          var resizeTime = _this2.resizeTimeSnap(time + _this2.resizeTimeDelta(e, resizeEdge));

          if (_this2.props.moveResizeValidator) {
            resizeTime = _this2.props.moveResizeValidator('resize', _this2.props.item, resizeTime, resizeEdge);
          }

          if (_this2.props.onResizing) {
            _this2.props.onResizing(_this2.itemId, resizeTime, resizeEdge);
          }

          _this2.setState({
            resizeTime: resizeTime
          });
        }
      }).on('resizeend', function (e) {
        if (_this2.state.resizing) {
          var resizeEdge = _this2.state.resizeEdge;

          var time = resizeEdge === 'left' ? _this2.itemTimeStart : _this2.itemTimeEnd;
          var resizeTime = _this2.resizeTimeSnap(time + _this2.resizeTimeDelta(e, resizeEdge));

          if (_this2.props.moveResizeValidator) {
            resizeTime = _this2.props.moveResizeValidator('resize', _this2.props.item, resizeTime, resizeEdge);
          }

          if (_this2.props.onResized) {
            _this2.props.onResized(_this2.itemId, resizeTime, resizeEdge, _this2.resizeTimeDelta(e, resizeEdge));
          }
          _this2.setState({
            resizing: null,
            resizeStart: null,
            resizeEdge: null,
            resizeTime: null
          });
        }
      }).on('tap', function (e) {
        _this2.actualClick(e, e.pointerType === 'mouse' ? 'click' : 'touch');
      });

      this.setState({
        interactMounted: true
      });
    }
  }, {
    key: 'canResizeLeft',
    value: function canResizeLeft() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      if (!props.canResizeLeft || props.dimensions.clippedLeft) {
        return false;
      }
      var width = parseInt(props.dimensions.width, 10);
      return width >= props.minResizeWidth;
    }
  }, {
    key: 'canResizeRight',
    value: function canResizeRight() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      if (!props.canResizeRight || props.dimensions.clippedRight) {
        return false;
      }
      var width = parseInt(props.dimensions.width, 10);
      return width >= props.minResizeWidth;
    }
  }, {
    key: 'canMove',
    value: function canMove() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      return !!props.canMove;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.cacheDataFromProps(nextProps);

      var interactMounted = this.state.interactMounted;

      var couldDrag = this.props.selected && this.canMove(this.props);
      var couldResizeLeft = this.props.selected && this.canResizeLeft(this.props);
      var couldResizeRight = this.props.selected && this.canResizeRight(this.props);
      var willBeAbleToDrag = nextProps.selected && this.canMove(nextProps);
      var willBeAbleToResizeLeft = nextProps.selected && this.canResizeLeft(nextProps);
      var willBeAbleToResizeRight = nextProps.selected && this.canResizeRight(nextProps);

      if (nextProps.selected && !interactMounted) {
        this.mountInteract();
        interactMounted = true;
      }

      if (interactMounted && (couldResizeLeft !== willBeAbleToResizeLeft || couldResizeRight !== willBeAbleToResizeRight)) {
        var leftResize = this.props.useResizeHandle ? this.dragLeft : true;
        var rightResize = this.props.useResizeHandle ? this.dragRight : true;

        (0, _interact2.default)(this.item).resizable({
          enabled: willBeAbleToResizeLeft || willBeAbleToResizeRight,
          edges: {
            top: false,
            bottom: false,
            left: willBeAbleToResizeLeft && leftResize,
            right: willBeAbleToResizeRight && rightResize
          }
        });
      }
      if (interactMounted && couldDrag !== willBeAbleToDrag) {
        (0, _interact2.default)(this.item).draggable({ enabled: willBeAbleToDrag });
      }
    }
  }, {
    key: 'actualClick',
    value: function actualClick(e, clickType) {
      if (this.props.canSelect && this.props.onSelect) {
        this.props.onSelect(this.itemId, clickType, e);
      }
    }
  }, {
    key: 'renderContent',
    value: function renderContent() {
      var timelineContext = this.context.getTimelineContext();
      var Comp = this.props.itemRenderer;
      if (Comp) {
        return _react2.default.createElement(Comp, { item: this.props.item, timelineContext: timelineContext });
      } else {
        return this.itemTitle;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var dimensions = this.props.dimensions;
      if (typeof this.props.order === 'undefined' || this.props.order === null) {
        return null;
      }

      var classNames = 'rct-item' + (this.props.selected ? ' selected' : '') + (this.canMove(this.props) ? ' can-move' : '') + (this.canResizeLeft(this.props) || this.canResizeRight(this.props) ? ' can-resize' : '') + (this.canResizeLeft(this.props) ? ' can-resize-left' : '') + (this.canResizeRight(this.props) ? ' can-resize-right' : '') + (this.props.item.className ? ' ' + this.props.item.className : '') + (dimensions.clippedLeft ? ' clipped-left' : '') + (dimensions.clippedRight ? ' clipped-right' : '');

      var style = {
        left: dimensions.left + 'px',
        top: dimensions.top + 'px',
        width: dimensions.width + 'px',
        height: dimensions.height + 'px',
        lineHeight: dimensions.height + 'px'
      };

      return _react2.default.createElement(
        'div',
        _extends({}, this.props.item.itemProps, {
          key: this.itemId,
          ref: function ref(el) {
            return _this3.item = el;
          },
          className: classNames,
          title: this.itemDivTitle,
          onMouseDown: this.onMouseDown,
          onMouseUp: this.onMouseUp,
          onTouchStart: this.onTouchStart,
          onTouchEnd: this.onTouchEnd,
          onDoubleClick: this.handleDoubleClick,
          onContextMenu: this.handleContextMenu,
          style: style
        }),
        this.props.useResizeHandle ? _react2.default.createElement('div', { ref: function ref(el) {
            return _this3.dragLeft = el;
          }, className: 'rct-drag-left' }) : '',
        _react2.default.createElement(
          'div',
          { className: 'rct-item-overflow' },
          _react2.default.createElement(
            'div',
            { className: 'rct-item-content' },
            this.renderContent()
          )
        ),
        this.props.useResizeHandle ? _react2.default.createElement('div', { ref: function ref(el) {
            return _this3.dragRight = el;
          }, className: 'rct-drag-right' }) : ''
      );
    }
  }]);

  return Item;
}(_react.Component);

Item.propTypes = {
  canvasTimeStart: _propTypes2.default.number.isRequired,
  canvasTimeEnd: _propTypes2.default.number.isRequired,
  canvasWidth: _propTypes2.default.number.isRequired,
  order: _propTypes2.default.number,

  dragSnap: _propTypes2.default.number,
  minResizeWidth: _propTypes2.default.number,
  selected: _propTypes2.default.bool,

  canChangeGroup: _propTypes2.default.bool.isRequired,
  canMove: _propTypes2.default.bool.isRequired,
  canResizeLeft: _propTypes2.default.bool.isRequired,
  canResizeRight: _propTypes2.default.bool.isRequired,

  keys: _propTypes2.default.object.isRequired,
  item: _propTypes2.default.object.isRequired,

  onSelect: _propTypes2.default.func,
  onDrag: _propTypes2.default.func,
  onDrop: _propTypes2.default.func,
  onResizing: _propTypes2.default.func,
  onResized: _propTypes2.default.func,
  onContextMenu: _propTypes2.default.func,
  itemRenderer: _propTypes2.default.func,

  itemProps: _propTypes2.default.object,
  canSelect: _propTypes2.default.bool,
  topOffset: _propTypes2.default.number,
  dimensions: _propTypes2.default.object,
  groupTops: _propTypes2.default.array,
  useResizeHandle: _propTypes2.default.bool,
  moveResizeValidator: _propTypes2.default.func,
  onItemDoubleClick: _propTypes2.default.func
};
Item.defaultProps = {
  selected: false
};
Item.contextTypes = {
  getTimelineContext: _propTypes2.default.func
};
var _default = Item;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Item, 'Item', 'src/lib/items/Item.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/items/Item.js');
}();

;
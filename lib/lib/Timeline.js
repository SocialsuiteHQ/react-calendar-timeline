'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSubHeaderLabelFormats = exports.defaultHeaderLabelFormats = exports.defaultTimeSteps = exports.defaultKeys = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('./Timeline.css');

var _Items = require('./items/Items');

var _Items2 = _interopRequireDefault(_Items);

var _InfoLabel = require('./layout/InfoLabel');

var _InfoLabel2 = _interopRequireDefault(_InfoLabel);

var _Sidebar = require('./layout/Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Header = require('./layout/Header');

var _Header2 = _interopRequireDefault(_Header);

var _VerticalLines = require('./lines/VerticalLines');

var _VerticalLines2 = _interopRequireDefault(_VerticalLines);

var _HorizontalLines = require('./lines/HorizontalLines');

var _HorizontalLines2 = _interopRequireDefault(_HorizontalLines);

var _TodayLine = require('./lines/TodayLine');

var _TodayLine2 = _interopRequireDefault(_TodayLine);

var _CursorLine = require('./lines/CursorLine');

var _CursorLine2 = _interopRequireDefault(_CursorLine);

var _window = require('../resize-detector/window');

var _window2 = _interopRequireDefault(_window);

var _calendar = require('./utility/calendar');

var _domHelpers = require('./utility/dom-helpers');

var _generic = require('./utility/generic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultKeys = exports.defaultKeys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time'
};

var defaultTimeSteps = exports.defaultTimeSteps = {
  second: 1,
  minute: 1,
  hour: 1,
  day: 1,
  month: 1,
  year: 1
};

var defaultHeaderLabelFormats = exports.defaultHeaderLabelFormats = {
  yearShort: 'YY',
  yearLong: 'YYYY',
  monthShort: 'MM/YY',
  monthMedium: 'MM/YYYY',
  monthMediumLong: 'MMM YYYY',
  monthLong: 'MMMM YYYY',
  dayShort: 'L',
  dayLong: 'dddd, LL',
  hourShort: 'HH',
  hourMedium: 'HH:00',
  hourMediumLong: 'L, HH:00',
  hourLong: 'dddd, LL, HH:00',
  time: 'LLL'
};

var defaultSubHeaderLabelFormats = exports.defaultSubHeaderLabelFormats = {
  yearShort: 'YY',
  yearLong: 'YYYY',
  monthShort: 'MM',
  monthMedium: 'MMM',
  monthLong: 'MMMM',
  dayShort: 'D',
  dayMedium: 'dd D',
  dayMediumLong: 'ddd, Do',
  dayLong: 'dddd, Do',
  hourShort: 'HH',
  hourLong: 'HH:00',
  minuteShort: 'mm',
  minuteLong: 'HH:mm'
};

var ReactCalendarTimeline = function (_Component) {
  _inherits(ReactCalendarTimeline, _Component);

  _createClass(ReactCalendarTimeline, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      return {
        getTimelineContext: function getTimelineContext() {
          return _this2.getTimelineContext();
        }
      };
    }
  }]);

  function ReactCalendarTimeline(props) {
    _classCallCheck(this, ReactCalendarTimeline);

    var _this = _possibleConstructorReturn(this, (ReactCalendarTimeline.__proto__ || Object.getPrototypeOf(ReactCalendarTimeline)).call(this, props));

    _initialiseProps.call(_this);

    var visibleTimeStart = null;
    var visibleTimeEnd = null;

    if (_this.props.defaultTimeStart && _this.props.defaultTimeEnd) {
      visibleTimeStart = _this.props.defaultTimeStart.valueOf();
      visibleTimeEnd = _this.props.defaultTimeEnd.valueOf();
    } else if (_this.props.visibleTimeStart && _this.props.visibleTimeEnd) {
      visibleTimeStart = _this.props.visibleTimeStart;
      visibleTimeEnd = _this.props.visibleTimeEnd;
    } else {
      visibleTimeStart = Math.min.apply(Math, _toConsumableArray(_this.props.items.map(function (item) {
        return (0, _generic._get)(item, 'start').getTime();
      })));
      visibleTimeEnd = Math.max.apply(Math, _toConsumableArray(_this.props.items.map(function (item) {
        return (0, _generic._get)(item, 'end').getTime();
      })));

      if (!visibleTimeStart || !visibleTimeEnd) {
        visibleTimeStart = new Date().getTime() - 86400 * 7 * 1000;
        visibleTimeEnd = new Date().getTime() + 86400 * 7 * 1000;
      }

      if (_this.props.onTimeInit) {
        _this.props.onTimeInit(visibleTimeStart, visibleTimeEnd);
      }
    }

    var selectedItems = [];
    if (_this.props.selected) {
      selectedItems = _this.props.selected.slice(); // copy selection to state
    }

    _this.state = {
      width: 1000,

      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeEnd,
      canvasTimeStart: visibleTimeStart - (visibleTimeEnd - visibleTimeStart),

      headerPosition: 'top',

      selectedItems: selectedItems,
      dragTimeDelta: 0,
      dragGroupDelta: 0,
      infoLabel: null,
      resizeTime: null,
      isDragging: false,
      topOffset: 0,
      resizingItem: null,
      resizingEdge: null,
      isDraggingItem: false,

      // Fix for onScroll firing with visiableTime set
      isLoaded: !(_this.props.visibleTimeStart && _this.props.visibleTimeEnd)
    };

    var _this$stackItems = _this.stackItems(props.items, props.groups, _this.state.canvasTimeStart, _this.state.visibleTimeStart, _this.state.visibleTimeEnd, _this.state.width),
        dimensionItems = _this$stackItems.dimensionItems,
        height = _this$stackItems.height,
        groupHeights = _this$stackItems.groupHeights,
        groupTops = _this$stackItems.groupTops;

    /* eslint-disable react/no-direct-mutation-state */


    _this.state.dimensionItems = dimensionItems;
    _this.state.height = height;
    _this.state.groupHeights = groupHeights;
    _this.state.groupTops = groupTops;

    /* eslint-enable */
    return _this;
  }

  _createClass(ReactCalendarTimeline, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.resize(this.props);

      if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
        this.props.resizeDetector.addListener(this);
      }

      _window2.default.addListener(this);

      this.lastTouchDistance = null;

      window.addEventListener('scroll', this.scrollEventListener);

      this.scrollComponent.addEventListener('touchstart', this.touchStart);
      this.scrollComponent.addEventListener('touchmove', this.touchMove);
      this.scrollComponent.addEventListener('touchend', this.touchEnd);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
        this.props.resizeDetector.removeListener(this);
      }

      _window2.default.removeListener(this);

      window.removeEventListener('scroll', this.scrollEventListener);

      this.scrollComponent.removeEventListener('touchstart', this.touchStart);
      this.scrollComponent.removeEventListener('touchmove', this.touchMove);
      this.scrollComponent.removeEventListener('touchend', this.touchEnd);
    }

    // called on window scroll. it's job is to figure out if we should fix or float the header

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var visibleTimeStart = nextProps.visibleTimeStart,
          visibleTimeEnd = nextProps.visibleTimeEnd,
          items = nextProps.items,
          groups = nextProps.groups,
          sidebarWidth = nextProps.sidebarWidth,
          selected = nextProps.selected;


      if (selected) {
        this.setState({
          selectedItems: selected
        });
      }

      if (visibleTimeStart && visibleTimeEnd) {
        this.updateScrollCanvas(visibleTimeStart, visibleTimeEnd, items !== this.props.items || groups !== this.props.groups, items, groups);
      } else if (items !== this.props.items || groups !== this.props.groups) {
        this.updateDimensions(items, groups);
      }

      // resize if the sidebar width changed
      if (sidebarWidth !== this.props.sidebarWidth && items && groups) {
        this.resize(nextProps);
      }
    }
  }, {
    key: 'updateDimensions',
    value: function updateDimensions(items, groups) {
      var _state = this.state,
          canvasTimeStart = _state.canvasTimeStart,
          visibleTimeStart = _state.visibleTimeStart,
          visibleTimeEnd = _state.visibleTimeEnd,
          width = _state.width;

      var _stackItems = this.stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, width),
          dimensionItems = _stackItems.dimensionItems,
          height = _stackItems.height,
          groupHeights = _stackItems.groupHeights,
          groupTops = _stackItems.groupTops;

      this.setState({ dimensionItems: dimensionItems, height: height, groupHeights: groupHeights, groupTops: groupTops });
    }

    // called when the visible time changes

  }, {
    key: 'zoomIn',
    value: function zoomIn(e) {
      e.preventDefault();

      this.changeZoom(0.75);
    }
  }, {
    key: 'zoomOut',
    value: function zoomOut(e) {
      e.preventDefault();

      this.changeZoom(1.25);
    }
  }, {
    key: 'changeZoom',
    value: function changeZoom(scale) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
      var _props = this.props,
          minZoom = _props.minZoom,
          maxZoom = _props.maxZoom;

      var oldZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
      var newZoom = Math.min(Math.max(Math.round(oldZoom * scale), minZoom), maxZoom); // min 1 min, max 20 years
      var newVisibleTimeStart = Math.round(this.state.visibleTimeStart + (oldZoom - newZoom) * offset);

      this.props.onTimeChange(newVisibleTimeStart, newVisibleTimeStart + newZoom, this.updateScrollCanvas);
    }
  }, {
    key: 'todayLine',
    value: function todayLine(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight) {
      return _react2.default.createElement(_TodayLine2.default, {
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        lineCount: (0, _generic._length)(this.props.groups),
        height: height,
        headerHeight: headerHeight
      });
    }
  }, {
    key: 'cursorLine',
    value: function cursorLine(cursorTime, canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight) {
      return _react2.default.createElement(_CursorLine2.default, {
        cursorTime: cursorTime,
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        lineCount: (0, _generic._length)(this.props.groups),
        height: height,
        headerHeight: headerHeight
      });
    }
  }, {
    key: 'verticalLines',
    value: function verticalLines(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height, headerHeight) {
      return _react2.default.createElement(_VerticalLines2.default, {
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        lineCount: (0, _generic._length)(this.props.groups),
        minUnit: minUnit,
        timeSteps: timeSteps,
        fixedHeader: this.props.fixedHeader,
        height: height,
        headerHeight: headerHeight
      });
    }
  }, {
    key: 'horizontalLines',
    value: function horizontalLines(canvasWidth, groupHeights, headerHeight) {
      return _react2.default.createElement(_HorizontalLines2.default, {
        canvasWidth: canvasWidth,
        lineCount: (0, _generic._length)(this.props.groups),
        groupHeights: groupHeights,
        headerHeight: headerHeight
      });
    }
  }, {
    key: 'items',
    value: function items(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops) {
      return _react2.default.createElement(_Items2.default, { canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineCount: (0, _generic._length)(this.props.groups),
        dimensionItems: dimensionItems,
        minUnit: minUnit,
        groupHeights: groupHeights,
        groupTops: groupTops,
        items: this.props.items,
        groups: this.props.groups,
        keys: this.props.keys,
        selectedItems: this.state.selectedItems,
        dragSnap: this.props.dragSnap,
        minResizeWidth: this.props.minResizeWidth,
        canChangeGroup: this.props.canChangeGroup,
        canMove: this.props.canMove,
        canResize: this.props.canResize,
        useResizeHandle: this.props.useResizeHandle,
        canSelect: this.props.canSelect,
        moveResizeValidator: this.props.moveResizeValidator,
        topOffset: this.state.topOffset,
        itemSelect: this.selectItem,
        itemDragStart: this.itemDragStart,
        itemDrag: this.itemDrag,
        itemDrop: this.itemDrop,
        onMouseUp: this.handleMouseUp,
        onItemDoubleClick: this.props.onItemDoubleClick,
        onItemContextMenu: this.props.onItemContextMenu,
        itemResizing: this.resizingItem,
        itemResized: this.resizedItem,
        itemRenderer: this.props.itemRenderer,
        selected: this.props.selected });
    }
  }, {
    key: 'infoLabel',
    value: function infoLabel() {
      var label = null;

      if (this.state.dragTime) {
        label = (0, _moment2.default)(this.state.dragTime).format('LLL') + ', ' + this.state.dragGroupTitle;
      } else if (this.state.resizeTime) {
        label = (0, _moment2.default)(this.state.resizeTime).format('LLL');
      }

      return label ? _react2.default.createElement(_InfoLabel2.default, { label: label }) : '';
    }
  }, {
    key: 'header',
    value: function header(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, headerLabelGroupHeight, headerLabelHeight) {
      return _react2.default.createElement(_Header2.default, {
        canvasTimeStart: canvasTimeStart,
        hasRightSidebar: this.props.rightSidebarWidth > 0,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        minUnit: minUnit,
        timeSteps: timeSteps,
        headerLabelGroupHeight: headerLabelGroupHeight,
        headerLabelHeight: headerLabelHeight,
        width: this.state.width,
        zoom: zoom,
        visibleTimeStart: this.state.visibleTimeStart,
        visibleTimeEnd: this.state.visibleTimeEnd,
        headerPosition: this.state.headerPosition,
        fixedHeader: this.props.fixedHeader,
        stickyOffset: this.props.stickyOffset,
        showPeriod: this.showPeriod,
        headerLabelFormats: this.props.headerLabelFormats,
        subHeaderLabelFormats: this.props.subHeaderLabelFormats
      });
    }
  }, {
    key: 'sidebar',
    value: function sidebar(height, groupHeights, headerHeight) {
      return _react2.default.createElement(
        _Sidebar2.default,
        {
          groups: this.props.groups,
          groupRenderer: this.props.groupRenderer,
          keys: this.props.keys,
          width: this.props.sidebarWidth,
          lineHeight: this.props.lineHeight,
          groupHeights: groupHeights,
          height: height,
          headerHeight: headerHeight,
          headerPosition: this.state.headerPosition,
          stickyOffset: this.props.stickyOffset,
          fixedHeader: this.props.fixedHeader
        },
        this.props.sidebarContent
      );
    }
  }, {
    key: 'rightSidebar',
    value: function rightSidebar(height, groupHeights, headerHeight) {
      return _react2.default.createElement(
        _Sidebar2.default,
        {
          groups: this.props.groups,
          keys: this.props.keys,
          isRightSidebar: true,
          width: this.props.rightSidebarWidth,
          lineHeight: this.props.lineHeight,
          groupHeights: groupHeights,
          height: height,
          headerHeight: headerHeight,
          headerPosition: this.state.headerPosition,
          stickyOffset: this.props.stickyOffset,
          fixedHeader: this.props.fixedHeader
        },
        this.props.rightSidebarContent
      );
    }
  }, {
    key: 'stackItems',
    value: function stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, width) {
      var _this3 = this;

      // if there are no groups return an empty array of dimensions
      if (groups.length === 0) {
        return {
          dimensionItems: [],
          height: 0,
          groupHeights: [],
          groupTops: []
        };
      }

      var _props2 = this.props,
          keys = _props2.keys,
          dragSnap = _props2.dragSnap,
          lineHeight = _props2.lineHeight,
          headerLabelGroupHeight = _props2.headerLabelGroupHeight,
          headerLabelHeight = _props2.headerLabelHeight,
          stackItems = _props2.stackItems,
          fullUpdate = _props2.fullUpdate,
          itemHeightRatio = _props2.itemHeightRatio,
          canChangeGroup = _props2.canChangeGroup;
      var _state2 = this.state,
          isDraggingItem = _state2.isDraggingItem,
          dragTimeDelta = _state2.dragTimeDelta,
          resizingItem = _state2.resizingItem,
          resizingEdge = _state2.resizingEdge,
          resizeTime = _state2.resizeTime,
          dragGroupDelta = _state2.dragGroupDelta;

      var zoom = visibleTimeEnd - visibleTimeStart;
      var canvasTimeEnd = canvasTimeStart + zoom * 3;
      var canvasWidth = width * 3;
      var headerHeight = headerLabelGroupHeight + headerLabelHeight;

      var visibleItems = (0, _calendar.getVisibleItems)(items, canvasTimeStart, canvasTimeEnd, keys);
      var groupOrders = (0, _calendar.getGroupOrders)(groups, keys);

      var dimensionItems = visibleItems.reduce(function (memo, item) {
        var itemId = (0, _generic._get)(item, keys.itemIdKey);
        var itemTimeStart = (0, _generic._get)(item, keys.itemTimeStartKey);
        var isResizing = itemId === resizingItem;
        var isDragging = isDraggingItem && _this3.state.selectedItems.indexOf(itemId) > -1;

        var dimension = (0, _calendar.calculateDimensions)({
          itemTimeStart: itemTimeStart,
          itemTimeEnd: (0, _generic._get)(item, keys.itemTimeEndKey),
          isDragging: isDragging,
          isResizing: isResizing,
          canvasTimeStart: canvasTimeStart,
          canvasTimeEnd: canvasTimeEnd,
          canvasWidth: canvasWidth,
          dragSnap: dragSnap,
          dragTime: itemTimeStart + dragTimeDelta,
          resizingItem: resizingItem,
          resizingEdge: resizingEdge,
          resizeTime: resizeTime,
          fullUpdate: fullUpdate,
          visibleTimeStart: visibleTimeStart,
          visibleTimeEnd: visibleTimeEnd
        });

        if (dimension) {
          dimension.top = null;

          var order = groupOrders[(0, _generic._get)(item, keys.itemGroupKey)];
          if (isDraggingItem && canChangeGroup && _this3.state.selectedItems.indexOf(itemId) > -1) {
            order = order + dragGroupDelta;
            if (order > Object.keys(groupOrders).length - 1) {
              order = Object.keys(groupOrders).length - 1;
            }
            if (order < 0) {
              order = 0;
            }
          }
          dimension.order = order;
          dimension.stack = !item.isOverlay;
          dimension.height = lineHeight * itemHeightRatio;
          dimension.isDragging = isDragging;

          memo.push({
            id: itemId,
            dimensions: dimension
          });
        }

        return memo;
      }, []);

      var stackingMethod = stackItems ? _calendar.stack : _calendar.nostack;

      var _stackingMethod = stackingMethod(dimensionItems, groupOrders, lineHeight, headerHeight),
          height = _stackingMethod.height,
          groupHeights = _stackingMethod.groupHeights,
          groupTops = _stackingMethod.groupTops;

      return { dimensionItems: dimensionItems, height: height, groupHeights: groupHeights, groupTops: groupTops };
    }
  }, {
    key: 'childrenWithProps',
    value: function childrenWithProps(canvasTimeStart, canvasTimeEnd, canvasWidth, dimensionItems, groupHeights, groupTops, height, headerHeight, visibleTimeStart, visibleTimeEnd, minUnit, timeSteps) {
      if (!this.props.children) {
        return null;
      }

      // convert to an array and remove the nulls
      var childArray = Array.isArray(this.props.children) ? this.props.children.filter(function (c) {
        return c;
      }) : [this.props.children];

      var childProps = {
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        visibleTimeStart: visibleTimeStart,
        visibleTimeEnd: visibleTimeEnd,
        dimensionItems: dimensionItems,
        items: this.props.items,
        groups: this.props.groups,
        keys: this.props.keys,
        // TODO: combine these two
        groupHeights: groupHeights,
        groupTops: groupTops,
        selected: this.state.selectedItem && !this.props.selected ? [this.state.selectedItem] : this.props.selected || [],
        height: height,
        headerHeight: headerHeight,
        minUnit: minUnit,
        timeSteps: timeSteps
      };

      return _react2.default.Children.map(childArray, function (child) {
        return _react2.default.cloneElement(child, childProps);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props3 = this.props,
          items = _props3.items,
          groups = _props3.groups,
          headerLabelGroupHeight = _props3.headerLabelGroupHeight,
          headerLabelHeight = _props3.headerLabelHeight,
          sidebarWidth = _props3.sidebarWidth,
          rightSidebarWidth = _props3.rightSidebarWidth,
          timeSteps = _props3.timeSteps,
          showCursorLine = _props3.showCursorLine;
      var _state3 = this.state,
          isDraggingItem = _state3.isDraggingItem,
          resizingItem = _state3.resizingItem,
          isDragging = _state3.isDragging,
          width = _state3.width,
          visibleTimeStart = _state3.visibleTimeStart,
          visibleTimeEnd = _state3.visibleTimeEnd,
          canvasTimeStart = _state3.canvasTimeStart,
          mouseOverCanvas = _state3.mouseOverCanvas,
          cursorTime = _state3.cursorTime;
      var _state4 = this.state,
          dimensionItems = _state4.dimensionItems,
          height = _state4.height,
          groupHeights = _state4.groupHeights,
          groupTops = _state4.groupTops;


      var zoom = visibleTimeEnd - visibleTimeStart;
      var canvasTimeEnd = canvasTimeStart + zoom * 3;
      var canvasWidth = width * 3;
      var minUnit = (0, _calendar.getMinUnit)(zoom, width, timeSteps);
      var headerHeight = headerLabelGroupHeight + headerLabelHeight;

      if (isDraggingItem || resizingItem) {
        var stackResults = this.stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, width);
        dimensionItems = stackResults.dimensionItems;
        height = stackResults.height;
        groupHeights = stackResults.groupHeights;
        groupTops = stackResults.groupTops;
      }

      var outerComponentStyle = {
        height: height + 'px'
      };

      var scrollComponentStyle = {
        width: width + 'px',
        height: height + 20 + 'px',
        cursor: isDragging ? 'move' : 'default'
      };

      var canvasComponentStyle = {
        width: canvasWidth + 'px',
        height: height + 'px'
      };

      return _react2.default.createElement(
        'div',
        {
          style: this.props.style,
          ref: function ref(el) {
            return _this4.container = el;
          },
          className: 'react-calendar-timeline'
        },
        _react2.default.createElement(
          'div',
          { style: outerComponentStyle, className: 'rct-outer' },
          sidebarWidth > 0 ? this.sidebar(height, groupHeights, headerHeight) : null,
          _react2.default.createElement(
            'div',
            {
              ref: function ref(el) {
                return _this4.scrollComponent = el;
              },
              className: 'rct-scroll',
              style: scrollComponentStyle,
              onScroll: this.onScroll,
              onWheel: this.onWheel,
              onMouseDown: this.handleMouseDown,
              onMouseMove: this.handleMouseMove,
              onMouseUp: this.handleMouseUp,
              onMouseLeave: this.handleMouseLeave
            },
            _react2.default.createElement(
              'div',
              {
                ref: function ref(el) {
                  return _this4.canvasComponent = el;
                },
                className: 'rct-canvas',
                style: canvasComponentStyle,
                onDoubleClick: this.handleDoubleClick,
                onMouseEnter: this.handleCanvasMouseEnter,
                onMouseLeave: this.handleCanvasMouseLeave,
                onMouseMove: this.handleCanvasMouseMove,
                onContextMenu: this.handleCanvasContextMenu
              },
              this.items(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops),
              this.verticalLines(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height, headerHeight),
              this.horizontalLines(canvasWidth, groupHeights, headerHeight),
              this.todayLine(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight),
              mouseOverCanvas && showCursorLine ? this.cursorLine(cursorTime, canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight) : null,
              this.state.infoLabel ? _react2.default.createElement(_InfoLabel2.default, { label: this.state.infoLabel }) : null,
              this.header(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, headerLabelGroupHeight, headerLabelHeight),
              mouseOverCanvas && showCursorLine ? this.cursorLine(cursorTime, canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight) : null,
              this.infoLabel(),
              this.childrenWithProps(canvasTimeStart, canvasTimeEnd, canvasWidth, dimensionItems, groupHeights, groupTops, height, headerHeight, visibleTimeStart, visibleTimeEnd, minUnit, timeSteps)
            )
          ),
          rightSidebarWidth > 0 ? this.rightSidebar(height, groupHeights, headerHeight) : null
        )
      );
    }
  }]);

  return ReactCalendarTimeline;
}(_react.Component);

ReactCalendarTimeline.propTypes = {
  groups: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]).isRequired,
  items: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]).isRequired,
  sidebarWidth: _propTypes2.default.number,
  sidebarContent: _propTypes2.default.node,
  rightSidebarWidth: _propTypes2.default.number,
  rightSidebarContent: _propTypes2.default.node,
  dragSnap: _propTypes2.default.number,
  minResizeWidth: _propTypes2.default.number,
  fixedHeader: _propTypes2.default.oneOf(['fixed', 'sticky', 'none']),
  stickyOffset: _propTypes2.default.number,
  fullUpdate: _propTypes2.default.bool,
  lineHeight: _propTypes2.default.number,
  headerLabelGroupHeight: _propTypes2.default.number,
  headerLabelHeight: _propTypes2.default.number,
  itemHeightRatio: _propTypes2.default.number,

  minZoom: _propTypes2.default.number,
  maxZoom: _propTypes2.default.number,

  clickTolerance: _propTypes2.default.number,

  canChangeGroup: _propTypes2.default.bool,
  canMove: _propTypes2.default.bool,
  canControlZoom: _propTypes2.default.bool,
  canResize: _propTypes2.default.oneOf([true, false, 'left', 'right', 'both']),
  useResizeHandle: _propTypes2.default.bool,
  canSelect: _propTypes2.default.bool,

  stackItems: _propTypes2.default.bool,

  traditionalZoom: _propTypes2.default.bool,
  showCursorLine: _propTypes2.default.bool,

  itemTouchSendsClick: _propTypes2.default.bool,

  onItemMove: _propTypes2.default.func,
  onItemResize: _propTypes2.default.func,
  onItemClick: _propTypes2.default.func,
  onItemSelect: _propTypes2.default.func,
  onItemDeselect: _propTypes2.default.func,
  onCanvasClick: _propTypes2.default.func,
  onItemDoubleClick: _propTypes2.default.func,
  onItemContextMenu: _propTypes2.default.func,
  onCanvasDoubleClick: _propTypes2.default.func,
  onCanvasContextMenu: _propTypes2.default.func,
  onCanvasMouseEnter: _propTypes2.default.func,
  onCanvasMouseLeave: _propTypes2.default.func,
  onCanvasMouseMove: _propTypes2.default.func,
  onZoom: _propTypes2.default.func,

  moveResizeValidator: _propTypes2.default.func,

  itemRenderer: _propTypes2.default.func,
  groupRenderer: _propTypes2.default.func,

  dayBackground: _propTypes2.default.func,

  style: _propTypes2.default.object,

  keys: _propTypes2.default.shape({
    groupIdKey: _propTypes2.default.string,
    groupTitleKey: _propTypes2.default.string,
    groupRightTitleKey: _propTypes2.default.string,
    itemIdKey: _propTypes2.default.string,
    itemTitleKey: _propTypes2.default.string,
    itemDivTitleKey: _propTypes2.default.string,
    itemGroupKey: _propTypes2.default.string,
    itemTimeStartKey: _propTypes2.default.string,
    itemTimeEndKey: _propTypes2.default.string
  }),

  timeSteps: _propTypes2.default.shape({
    second: _propTypes2.default.number,
    minute: _propTypes2.default.number,
    hour: _propTypes2.default.number,
    day: _propTypes2.default.number,
    month: _propTypes2.default.number,
    year: _propTypes2.default.number
  }),

  defaultTimeStart: _propTypes2.default.object,
  defaultTimeEnd: _propTypes2.default.object,

  visibleTimeStart: _propTypes2.default.number,
  visibleTimeEnd: _propTypes2.default.number,
  onTimeChange: _propTypes2.default.func,
  onTimeInit: _propTypes2.default.func,
  onBoundsChange: _propTypes2.default.func,

  selected: _propTypes2.default.array,

  headerLabelFormats: _propTypes2.default.shape({
    yearShort: _propTypes2.default.string,
    yearLong: _propTypes2.default.string,
    monthShort: _propTypes2.default.string,
    monthMedium: _propTypes2.default.string,
    monthMediumLong: _propTypes2.default.string,
    monthLong: _propTypes2.default.string,
    dayShort: _propTypes2.default.string,
    dayLong: _propTypes2.default.string,
    hourShort: _propTypes2.default.string,
    hourMedium: _propTypes2.default.string,
    hourMediumLong: _propTypes2.default.string,
    hourLong: _propTypes2.default.string
  }),

  subHeaderLabelFormats: _propTypes2.default.shape({
    yearShort: _propTypes2.default.string,
    yearLong: _propTypes2.default.string,
    monthShort: _propTypes2.default.string,
    monthMedium: _propTypes2.default.string,
    monthLong: _propTypes2.default.string,
    dayShort: _propTypes2.default.string,
    dayMedium: _propTypes2.default.string,
    dayMediumLong: _propTypes2.default.string,
    dayLong: _propTypes2.default.string,
    hourShort: _propTypes2.default.string,
    hourLong: _propTypes2.default.string,
    minuteShort: _propTypes2.default.string,
    minuteLong: _propTypes2.default.string
  }),

  resizeDetector: _propTypes2.default.shape({
    addListener: _propTypes2.default.func,
    removeListener: _propTypes2.default.func
  }),

  children: _propTypes2.default.node
};
ReactCalendarTimeline.defaultProps = {
  sidebarWidth: 150,
  rightSidebarWidth: 0,
  dragSnap: 1000 * 60 * 15, // 15min
  minResizeWidth: 20,
  fixedHeader: 'sticky', // fixed or sticky or none
  stickyOffset: 0,
  fullUpdate: true,
  lineHeight: 30,
  headerLabelGroupHeight: 30,
  headerLabelHeight: 30,
  itemHeightRatio: 0.65,

  minZoom: 60 * 60 * 1000, // 1 hour
  maxZoom: 5 * 365.24 * 86400 * 1000, // 5 years

  clickTolerance: 3, // how many pixels can we drag for it to be still considered a click?

  canChangeGroup: true,
  canMove: true,
  canControlZoom: true,
  canResize: 'right',
  useResizeHandle: false,
  canSelect: true,

  stackItems: false,

  traditionalZoom: false,
  showCursorLine: false,

  onItemMove: null,
  onItemResize: null,
  onItemClick: null,
  onItemSelect: null,
  onItemDeselect: null,
  onCanvasClick: null,
  onItemDoubleClick: null,
  onItemContextMenu: null,
  onCanvasMouseEnter: null,
  onCanvasMouseLeave: null,
  onCanvasMouseMove: null,
  onZoom: null,

  moveResizeValidator: null,

  dayBackground: null,

  defaultTimeStart: null,
  defaultTimeEnd: null,

  itemTouchSendsClick: false,

  style: {},
  keys: defaultKeys,
  timeSteps: defaultTimeSteps,

  // if you pass in visibleTimeStart and visibleTimeEnd, you must also pass onTimeChange(visibleTimeStart, visibleTimeEnd),
  // which needs to update the props visibleTimeStart and visibleTimeEnd to the ones passed
  visibleTimeStart: null,
  visibleTimeEnd: null,
  onTimeChange: function onTimeChange(visibleTimeStart, visibleTimeEnd, updateScrollCanvas) {
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
  },
  // called after the calendar loads and the visible time has been calculated
  onTimeInit: null,
  // called when the canvas area of the calendar changes
  onBoundsChange: null,
  children: null,

  headerLabelFormats: defaultHeaderLabelFormats,
  subHeaderLabelFormats: defaultSubHeaderLabelFormats,

  selected: null
};
ReactCalendarTimeline.childContextTypes = {
  getTimelineContext: _propTypes2.default.func
};

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.getTimelineContext = function () {
    var _state5 = _this5.state,
        width = _state5.width,
        visibleTimeStart = _state5.visibleTimeStart,
        visibleTimeEnd = _state5.visibleTimeEnd;

    //TODO: Performance
    //prob wanna memoize this so we ensure that if no items changed,
    //we return same context reference

    return {
      timelineWidth: width,
      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeEnd
    };
  };

  this.scrollEventListener = function () {
    var _props4 = _this5.props,
        headerLabelGroupHeight = _props4.headerLabelGroupHeight,
        headerLabelHeight = _props4.headerLabelHeight;

    var headerHeight = headerLabelGroupHeight + headerLabelHeight;

    var rect = _this5.container.getBoundingClientRect();

    if (rect.top > _this5.props.stickyOffset) {
      _this5.setState({ headerPosition: 'top' });
    } else if (rect.bottom < headerHeight + _this5.props.stickyOffset) {
      _this5.setState({ headerPosition: 'bottom' });
    } else {
      _this5.setState({ headerPosition: 'fixed' });
    }
  };

  this.touchStart = function (e) {
    if (e.touches.length === 2) {
      e.preventDefault();

      _this5.lastTouchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX);
      _this5.singleTouchStart = null;
      _this5.lastSingleTouch = null;
    } else if (e.touches.length === 1) {
      e.preventDefault();

      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;

      _this5.lastTouchDistance = null;
      _this5.singleTouchStart = { x: x, y: y, screenY: window.pageYOffset };
      _this5.lastSingleTouch = { x: x, y: y, screenY: window.pageYOffset };
    }
  };

  this.touchMove = function (e) {
    if (_this5.state.isDragging || _this5.state.resizeTime) {
      e.preventDefault();
      return;
    }
    if (_this5.lastTouchDistance && e.touches.length === 2) {
      e.preventDefault();

      var touchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX);

      var parentPosition = (0, _domHelpers.getParentPosition)(e.currentTarget);
      var xPosition = (e.touches[0].screenX + e.touches[1].screenX) / 2 - parentPosition.x;

      if (touchDistance !== 0 && _this5.lastTouchDistance !== 0) {
        _this5.changeZoom(_this5.lastTouchDistance / touchDistance, xPosition / _this5.state.width);
        _this5.lastTouchDistance = touchDistance;
      }
    } else if (_this5.lastSingleTouch && e.touches.length === 1) {
      e.preventDefault();

      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;

      var deltaX = x - _this5.lastSingleTouch.x;
      // let deltaY = y - this.lastSingleTouch.y

      var deltaX0 = x - _this5.singleTouchStart.x;
      var deltaY0 = y - _this5.singleTouchStart.y;

      _this5.lastSingleTouch = { x: x, y: y };

      var moveX = Math.abs(deltaX0) * 3 > Math.abs(deltaY0);
      var moveY = Math.abs(deltaY0) * 3 > Math.abs(deltaX0);

      if (deltaX !== 0 && moveX) {
        _this5.scrollComponent.scrollLeft -= deltaX;
      }
      if (moveY) {
        window.scrollTo(window.pageXOffset, _this5.singleTouchStart.screenY - deltaY0);
      }
    }
  };

  this.touchEnd = function (e) {
    if (_this5.lastTouchDistance) {
      e.preventDefault();

      _this5.lastTouchDistance = null;
    }
    if (_this5.lastSingleTouch) {
      e.preventDefault();

      _this5.lastSingleTouch = null;
      _this5.singleTouchStart = null;
    }
  };

  this.resize = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this5.props;

    var _container$getBoundin = _this5.container.getBoundingClientRect(),
        containerWidth = _container$getBoundin.width,
        containerTop = _container$getBoundin.top;

    var width = containerWidth - props.sidebarWidth - props.rightSidebarWidth;

    var _stackItems2 = _this5.stackItems(props.items, props.groups, _this5.state.canvasTimeStart, _this5.state.visibleTimeStart, _this5.state.visibleTimeEnd, width),
        dimensionItems = _stackItems2.dimensionItems,
        height = _stackItems2.height,
        groupHeights = _stackItems2.groupHeights,
        groupTops = _stackItems2.groupTops;

    _this5.setState({
      width: width,
      topOffset: containerTop + window.pageYOffset,
      dimensionItems: dimensionItems,
      height: height,
      groupHeights: groupHeights,
      groupTops: groupTops
    });
    _this5.scrollComponent.scrollLeft = width;
  };

  this.onScroll = function () {
    //Fix for scroll firing when visible Time is initially passed into render method
    if (!_this5.state.isLoaded) {
      _this5.setState({ isLoaded: true });
      _this5.updateScrollCanvas(_this5.props.visibleTimeStart, _this5.props.visibleTimeEnd, false, _this5.props.items, _this5.props.groups);
      return;
    }

    var scrollComponent = _this5.scrollComponent;
    var canvasTimeStart = _this5.state.canvasTimeStart;
    var scrollX = scrollComponent.scrollLeft;
    var zoom = _this5.state.visibleTimeEnd - _this5.state.visibleTimeStart;
    var width = _this5.state.width;
    var visibleTimeStart = canvasTimeStart + zoom * scrollX / width;

    // move the virtual canvas if needed
    if (scrollX < _this5.state.width * 0.5) {
      _this5.setState({
        canvasTimeStart: _this5.state.canvasTimeStart - zoom
      });
      scrollComponent.scrollLeft += _this5.state.width;
    }
    if (scrollX > _this5.state.width * 1.5) {
      _this5.setState({
        canvasTimeStart: _this5.state.canvasTimeStart + zoom
      });
      scrollComponent.scrollLeft -= _this5.state.width;
    }

    if (_this5.state.visibleTimeStart !== visibleTimeStart || _this5.state.visibleTimeEnd !== visibleTimeStart + zoom) {
      _this5.props.onTimeChange(visibleTimeStart, visibleTimeStart + zoom, _this5.updateScrollCanvas);
    }
  };

  this.updateScrollCanvas = function (visibleTimeStart, visibleTimeEnd, forceUpdateDimensions, updatedItems, updatedGroups) {
    var oldCanvasTimeStart = _this5.state.canvasTimeStart;
    var oldZoom = _this5.state.visibleTimeEnd - _this5.state.visibleTimeStart;
    var newZoom = visibleTimeEnd - visibleTimeStart;
    var items = updatedItems || _this5.props.items;
    var groups = updatedGroups || _this5.props.groups;
    var fullUpdate = _this5.props.fullUpdate;


    var newState = {
      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeEnd
    };

    var resetCanvas = false;

    var canKeepCanvas = visibleTimeStart >= oldCanvasTimeStart + oldZoom * 0.5 && visibleTimeStart <= oldCanvasTimeStart + oldZoom * 1.5 && visibleTimeEnd >= oldCanvasTimeStart + oldZoom * 1.5 && visibleTimeEnd <= oldCanvasTimeStart + oldZoom * 2.5;

    // if new visible time is in the right canvas area
    if (canKeepCanvas) {
      // but we need to update the scroll
      var newScrollLeft = Math.round(_this5.state.width * (visibleTimeStart - oldCanvasTimeStart) / newZoom);

      // SS: If tiny change in scroll then just reassign
      if (Math.abs((newZoom - oldZoom) / newZoom) < 0.001) {
        _this5.scrollComponent.scrollLeft = newScrollLeft;
      } else {
        resetCanvas = true;
      }
    } else {
      resetCanvas = true;
    }

    if (resetCanvas) {
      // Todo: need to calculate new dimensions
      newState.canvasTimeStart = visibleTimeStart - newZoom;
      _this5.scrollComponent.scrollLeft = _this5.state.width;

      if (_this5.props.onBoundsChange) {
        _this5.props.onBoundsChange(newState.canvasTimeStart, newState.canvasTimeStart + newZoom * 3);
      }
    }

    if (resetCanvas || forceUpdateDimensions || fullUpdate) {
      var canvasTimeStart = newState.canvasTimeStart ? newState.canvasTimeStart : oldCanvasTimeStart;

      var _stackItems3 = _this5.stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, _this5.state.width, fullUpdate),
          dimensionItems = _stackItems3.dimensionItems,
          height = _stackItems3.height,
          groupHeights = _stackItems3.groupHeights,
          groupTops = _stackItems3.groupTops;

      newState.dimensionItems = dimensionItems;
      newState.height = height;
      newState.groupHeights = groupHeights;
      newState.groupTops = groupTops;
    }

    _this5.setState(newState, function () {
      // are we changing zoom? Well then let's report it
      // need to wait until state is set so that we get current
      // timeline context
      if (_this5.props.onZoom && oldZoom !== newZoom) {
        _this5.props.onZoom(_this5.getTimelineContext());
      }
    });
  };

  this.zoomWithWheel = function (speed, xPosition, deltaY) {
    _this5.changeZoom(1.0 + speed * deltaY / 500, xPosition / _this5.state.width);
  };

  this.onWheel = function (e) {
    var _props5 = _this5.props,
        traditionalZoom = _props5.traditionalZoom,
        canControlZoom = _props5.canControlZoom;


    if (!canControlZoom) {
      return;
    }

    e.preventDefault();

    // zoom in the time dimension
    if (e.ctrlKey || e.metaKey || e.altKey) {
      var parentPosition = (0, _domHelpers.getParentPosition)(e.currentTarget);
      var xPosition = e.clientX - parentPosition.x;

      var speed = e.ctrlKey ? 10 : e.metaKey ? 3 : 1;

      _this5.zoomWithWheel(speed, xPosition, e.deltaY);

      // convert vertical zoom to horiziontal
    } else if (e.shiftKey) {
      var scrollComponent = _this5.scrollComponent;
      scrollComponent.scrollLeft += e.deltaY;

      // no modifier pressed? we prevented the default event, so scroll or zoom as needed
    } else {
      if (e.deltaX !== 0) {
        if (!traditionalZoom) {
          _this5.scrollComponent.scrollLeft += e.deltaX;
        }
      }
      if (e.deltaY !== 0) {
        window.scrollTo(window.pageXOffset, window.pageYOffset + e.deltaY);
        if (traditionalZoom) {
          var _parentPosition = (0, _domHelpers.getParentPosition)(e.currentTarget);
          var _xPosition = e.clientX - _parentPosition.x;

          _this5.zoomWithWheel(10, _xPosition, e.deltaY);
        }
      }
    }
  };

  this.showPeriod = function (from, unit) {
    var visibleTimeStart = from.valueOf();
    var visibleTimeEnd = (0, _moment2.default)(from).add(1, unit).valueOf();
    var zoom = visibleTimeEnd - visibleTimeStart;

    // can't zoom in more than to show one hour
    if (zoom < 360000) {
      return;
    }

    // clicked on the big header and already focused here, zoom out
    if (unit !== 'year' && _this5.state.visibleTimeStart === visibleTimeStart && _this5.state.visibleTimeEnd === visibleTimeEnd) {
      var nextUnit = (0, _calendar.getNextUnit)(unit);

      visibleTimeStart = from.startOf(nextUnit).valueOf();
      visibleTimeEnd = (0, _moment2.default)(visibleTimeStart).add(1, nextUnit);
      zoom = visibleTimeEnd - visibleTimeStart;
    }

    _this5.props.onTimeChange(visibleTimeStart, visibleTimeStart + zoom, _this5.updateScrollCanvas);
  };

  this.selectItem = function (item, clickType, e) {
    if (_this5.state.selectedItems.indexOf(item) > -1 || _this5.props.itemTouchSendsClick && clickType === 'touch') {
      if (_this5.props.onItemClick) {
        _this5.props.onItemClick(item, e);
      }
    } else {
      if (!_this5.props.selected) {
        _this5.setState({ selectedItems: [item] });
      }
      if (_this5.props.onItemSelect) {
        _this5.props.onItemSelect(item, e);
      }
    }
  };

  this.doubleClickItem = function (item, e) {
    if (_this5.props.onItemDoubleClick) {
      var time = _this5.timeFromItemEvent(e);
      _this5.props.onItemDoubleClick(item, e, time);
    }
  };

  this.contextMenuClickItem = function (item, e) {
    if (_this5.props.onItemContextMenu) {
      var time = _this5.timeFromItemEvent(e);
      _this5.props.onItemContextMenu(item, e, time);
    }
  };

  this.deselectItem = function () {
    if (!_this5.props.selected) {
      _this5.setState({ selectedItems: [] });
    }
    if (_this5.props.onItemDeselect) {
      _this5.props.onItemDeselect();
    }
  };

  this.rowAndTimeFromEvent = function (e) {
    var _props6 = _this5.props,
        headerLabelGroupHeight = _props6.headerLabelGroupHeight,
        headerLabelHeight = _props6.headerLabelHeight,
        dragSnap = _props6.dragSnap;
    var _state6 = _this5.state,
        width = _state6.width,
        groupHeights = _state6.groupHeights,
        visibleTimeStart = _state6.visibleTimeStart,
        visibleTimeEnd = _state6.visibleTimeEnd;

    var lineCount = (0, _generic._length)(_this5.props.groups);

    // get coordinates relative to the component
    var parentPosition = (0, _domHelpers.getParentPosition)(e.currentTarget);

    var x = e.clientX - parentPosition.x;
    var y = e.clientY - parentPosition.y;

    // calculate the y coordinate from `groupHeights` and header heights
    var row = 0;
    var remainingHeight = y - headerLabelGroupHeight - headerLabelHeight;

    while (row < lineCount && remainingHeight - groupHeights[row] > 0) {
      remainingHeight -= groupHeights[row];
      row += 1;
    }

    // calculate the x (time) coordinate taking the dragSnap into account
    var time = Math.round(visibleTimeStart + x / width * (visibleTimeEnd - visibleTimeStart));
    time = Math.floor(time / dragSnap) * dragSnap;

    return [row, time];
  };

  this.timeFromItemEvent = function (e) {
    var _state7 = _this5.state,
        width = _state7.width,
        visibleTimeStart = _state7.visibleTimeStart,
        visibleTimeEnd = _state7.visibleTimeEnd;
    var dragSnap = _this5.props.dragSnap;


    var scrollComponent = _this5.scrollComponent;

    var _scrollComponent$getB = scrollComponent.getBoundingClientRect(),
        scrollX = _scrollComponent$getB.x;

    var xRelativeToTimeline = e.clientX - scrollX;

    var relativeItemPosition = xRelativeToTimeline / width;
    var zoom = visibleTimeEnd - visibleTimeStart;
    var timeOffset = relativeItemPosition * zoom;

    var time = Math.round(visibleTimeStart + timeOffset);
    time = Math.floor(time / dragSnap) * dragSnap;

    return time;
  };

  this.scrollAreaClick = function (e) {
    if ((0, _domHelpers.hasSomeParentTheClass)(e.target, 'rct-header')) {
      // don't do anything if we clicked on the header
      // TODO: there should be a better way to handle this...
      return;
    }

    // if not clicking on an item
    if (!(0, _domHelpers.hasSomeParentTheClass)(e.target, 'rct-item')) {
      if (_this5.state.selectedItems.length > -1) {
        _this5.deselectItem();
      } else if (_this5.props.onCanvasClick) {
        var _rowAndTimeFromScroll = _this5.rowAndTimeFromScrollAreaEvent(e),
            _rowAndTimeFromScroll2 = _slicedToArray(_rowAndTimeFromScroll, 2),
            row = _rowAndTimeFromScroll2[0],
            time = _rowAndTimeFromScroll2[1];

        if (row >= 0 && row < _this5.props.groups.length) {
          var groupId = (0, _generic._get)(_this5.props.groups[row], _this5.props.keys.groupIdKey);
          _this5.props.onCanvasClick(groupId, time, e);
        }
      }
    }
  };

  this.itemDragStart = function (item) {
    _this5.setState({
      isDraggingItem: true
    });
  };

  this.itemDrag = function (itemId, dragTimeDelta, oldGroupOrder, dragGroupDelta) {
    var newGroup = _this5.props.groups[oldGroupOrder + dragGroupDelta];
    var keys = _this5.props.keys;

    var dragGroupTitle = (0, _generic._get)(newGroup, keys.groupTitleKey);
    var itemTimeStart = (0, _generic._get)(itemId, keys.itemTimeStartKey);

    _this5.setState({
      dragTimeDelta: dragTimeDelta,
      dragGroupDelta: dragGroupDelta,
      infoLabel: (0, _moment2.default)(itemTimeStart + dragTimeDelta).format('LLL') + ', ' + dragGroupTitle
    });
  };

  this.itemDrop = function (items) {
    // isDragging, dragStartPosition, and dragLastPosition needed by salesforce because otherwise it thinks you've also selected the canvas
    _this5.setState({
      isDraggingItem: false,
      dragTimeDelta: 0,
      infoLabel: null,
      isDragging: false,
      dragStartPosition: null,
      dragLastPosition: null
    });

    if (_this5.props.onItemMove) {
      var newItems = items.map(function (item) {
        return {
          id: item.itemId,
          group: Math.max(Math.min(item.order + item.dragGroupDelta, _this5.props.groups.length - 1), 0),
          dragTime: item.dragTime
        };
      });

      _this5.props.onItemMove(newItems);
    }
  };

  this.resizingItem = function (item, resizeTime, edge) {
    _this5.setState({
      resizingItem: item,
      resizingEdge: edge,
      resizeTime: resizeTime,
      infoLabel: (0, _moment2.default)(resizeTime).format('LLL')
    });
  };

  this.resizedItem = function (item, resizeTime, edge) {
    _this5.setState({
      resizingItem: null,
      resizingEdge: null,
      resizeTime: null,
      infoLabel: null
    });
    if (_this5.props.onItemResize) {
      _this5.props.onItemResize(item, resizeTime, edge);
    }
  };

  this.handleMouseDown = function (e) {
    var topOffset = _this5.state.topOffset;
    var pageY = e.pageY;
    var _props7 = _this5.props,
        headerLabelGroupHeight = _props7.headerLabelGroupHeight,
        headerLabelHeight = _props7.headerLabelHeight;

    var headerHeight = headerLabelGroupHeight + headerLabelHeight;

    if (pageY - topOffset > headerHeight && e.button === 0) {
      _this5.setState({
        isDragging: true,
        dragStartPosition: e.pageX,
        dragLastPosition: e.pageX
      });
    }
  };

  this.handleMouseMove = function (e) {
    if (_this5.state.isDragging && !_this5.state.isDraggingItem && !_this5.state.resizingItem) {
      _this5.scrollComponent.scrollLeft += _this5.state.dragLastPosition - e.pageX;
      _this5.setState({ dragLastPosition: e.pageX });
    }
  };

  this.handleMouseUp = function (e) {
    var dragStartPosition = _this5.state.dragStartPosition;


    if (Math.abs(dragStartPosition - e.pageX) <= _this5.props.clickTolerance) {
      _this5.scrollAreaClick(e);
    }

    _this5.setState({
      isDragging: false,
      dragStartPosition: null,
      dragLastPosition: null
    });
  };

  this.handleMouseLeave = function () {
    _this5.setState({
      isDragging: false,
      dragStartPosition: null,
      dragLastPosition: null
    });
  };

  this.handleCanvasMouseEnter = function (e) {
    var showCursorLine = _this5.props.showCursorLine;

    if (showCursorLine) {
      _this5.setState({ mouseOverCanvas: true });
    }

    if (_this5.props.onCanvasMouseEnter) {
      _this5.props.onCanvasMouseEnter(e);
    }
  };

  this.handleCanvasMouseLeave = function (e) {
    var showCursorLine = _this5.props.showCursorLine;

    if (showCursorLine) {
      _this5.setState({ mouseOverCanvas: false });
    }

    if (_this5.props.onCanvasMouseLeave) {
      _this5.props.onCanvasMouseLeave(e);
    }
  };

  this.handleCanvasMouseMove = function (e) {
    var showCursorLine = _this5.props.showCursorLine;
    var _state8 = _this5.state,
        canvasTimeStart = _state8.canvasTimeStart,
        width = _state8.width,
        visibleTimeStart = _state8.visibleTimeStart,
        visibleTimeEnd = _state8.visibleTimeEnd,
        cursorTime = _state8.cursorTime;

    var zoom = visibleTimeEnd - visibleTimeStart;
    var canvasTimeEnd = canvasTimeStart + zoom * 3;
    var canvasWidth = width * 3;
    var pageX = e.pageX;

    var ratio = (canvasTimeEnd - canvasTimeStart) / canvasWidth;
    var boundingRect = _this5.scrollComponent.getBoundingClientRect();
    var timePosition = visibleTimeStart + ratio * (pageX - boundingRect.left);

    if (_this5.props.dragSnap) {
      // Cursor line just displays time
      // timePosition = Math.round(timePosition / this.props.dragSnap) * this.props.dragSnap
    }

    if (_this5.props.onCanvasMouseMove) {
      _this5.props.onCanvasMouseMove(e);
    }

    if (cursorTime !== timePosition && showCursorLine) {
      _this5.setState({ cursorTime: timePosition, mouseOverCanvas: true });
    }
  };

  this.handleDoubleClick = function (e) {
    var _state9 = _this5.state,
        canvasTimeStart = _state9.canvasTimeStart,
        width = _state9.width,
        visibleTimeStart = _state9.visibleTimeStart,
        visibleTimeEnd = _state9.visibleTimeEnd,
        groupTops = _state9.groupTops,
        topOffset = _state9.topOffset;


    if (_this5.props.onCanvasDoubleClick == null || (0, _domHelpers.hasSomeParentTheClass)(e.target, 'rct-header')) {
      // do nothing cuz either we don't have on CanvasdoubleClick or we clicked on header
      // TODO: there has got to be a better way of handling this
      return;
    }

    var zoom = visibleTimeEnd - visibleTimeStart;
    var canvasTimeEnd = canvasTimeStart + zoom * 3;
    var canvasWidth = width * 3;
    var pageX = e.pageX,
        pageY = e.pageY;

    var ratio = (canvasTimeEnd - canvasTimeStart) / canvasWidth;
    var boundingRect = _this5.scrollComponent.getBoundingClientRect();
    var timePosition = visibleTimeStart + ratio * (pageX - boundingRect.left);
    if (_this5.props.dragSnap) {
      timePosition = Math.round(timePosition / _this5.props.dragSnap) * _this5.props.dragSnap;
    }

    var groupIndex = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(groupTops)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        var item = groupTops[key];
        if (pageY - topOffset > item) {
          groupIndex = parseInt(key, 10);
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

    if (_this5.props.onCanvasDoubleClick) {
      _this5.props.onCanvasDoubleClick(_this5.props.groups[groupIndex], timePosition, e);
    }
  };

  this.handleCanvasContextMenu = function (e) {
    var _state10 = _this5.state,
        canvasTimeStart = _state10.canvasTimeStart,
        width = _state10.width,
        visibleTimeStart = _state10.visibleTimeStart,
        visibleTimeEnd = _state10.visibleTimeEnd,
        groupTops = _state10.groupTops,
        topOffset = _state10.topOffset;

    var zoom = visibleTimeEnd - visibleTimeStart;
    var canvasTimeEnd = canvasTimeStart + zoom * 3;
    var canvasWidth = width * 3;
    var pageX = e.pageX,
        pageY = e.pageY;

    var ratio = (canvasTimeEnd - canvasTimeStart) / canvasWidth;
    var boundingRect = _this5.scrollComponent.getBoundingClientRect();
    var timePosition = visibleTimeStart + ratio * (pageX - boundingRect.left);
    if (_this5.props.dragSnap) {
      timePosition = Math.round(timePosition / _this5.props.dragSnap) * _this5.props.dragSnap;
    }

    var groupIndex = 0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = Object.keys(groupTops)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var key = _step2.value;

        var item = groupTops[key];
        if (pageY - topOffset > item) {
          groupIndex = parseInt(key, 10);
        } else {
          break;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    if (_this5.props.onCanvasContextMenu) {
      e.preventDefault();
      _this5.props.onCanvasContextMenu(_this5.props.groups[groupIndex], timePosition, e);
    }
  };
};

var _default = ReactCalendarTimeline;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(defaultKeys, 'defaultKeys', 'src/lib/Timeline.js');

  __REACT_HOT_LOADER__.register(defaultTimeSteps, 'defaultTimeSteps', 'src/lib/Timeline.js');

  __REACT_HOT_LOADER__.register(defaultHeaderLabelFormats, 'defaultHeaderLabelFormats', 'src/lib/Timeline.js');

  __REACT_HOT_LOADER__.register(defaultSubHeaderLabelFormats, 'defaultSubHeaderLabelFormats', 'src/lib/Timeline.js');

  __REACT_HOT_LOADER__.register(ReactCalendarTimeline, 'ReactCalendarTimeline', 'src/lib/Timeline.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/Timeline.js');
}();

;
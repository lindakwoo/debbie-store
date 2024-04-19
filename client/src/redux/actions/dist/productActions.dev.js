"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetProductError = exports.createProductReview = exports.getProduct = exports.toggleFavorites = exports.removeFromFavorites = exports.addToFavorites = exports.getProducts = void 0;

var _product = require("../slices/product");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getProducts = function getProducts(page, favoriteToggle) {
  return function _callee(dispatch) {
    var _ref, data, products, pagination;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch((0, _product.setLoading)());
            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/products/".concat(page, "/", 13)));

          case 4:
            _ref = _context.sent;
            data = _ref.data;
            products = data.products, pagination = data.pagination;
            dispatch((0, _product.setProducts)(products));
            dispatch((0, _product.setPagination)(pagination));
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](1);
            dispatch((0, _product.setError)(_context.t0.response && _context.t0.response.data.message ? _context.t0.response.data.message : _context.t0.message ? _context.t0.message : "An unexpected error has occured. Please try again later."));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 11]]);
  };
};

exports.getProducts = getProducts;

var addToFavorites = function addToFavorites(id) {
  return function _callee2(dispatch, getState) {
    var _getState, favorites, newFavorites;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _getState = getState(), favorites = _getState.product.favorites;
            newFavorites = [].concat(_toConsumableArray(favorites), [id]);
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
            dispatch((0, _product.setFavorites)(newFavorites));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.addToFavorites = addToFavorites;

var removeFromFavorites = function removeFromFavorites(id) {
  return function _callee3(dispatch, getState) {
    var _getState2, favorites, newFavorites;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _getState2 = getState(), favorites = _getState2.product.favorites;
            newFavorites = favorites.filter(function (favoriteId) {
              // eslint-disable-next-line no-unused-expressions
              favoriteId !== id;
            });
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
            dispatch((0, _product.setFavorites)(newFavorites));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.removeFromFavorites = removeFromFavorites;

var toggleFavorites = function toggleFavorites(toggle) {
  return function _callee4(dispatch, getState) {
    var _getState3, _getState3$product, favorites, products, filteredProducts;

    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _getState3 = getState(), _getState3$product = _getState3.product, favorites = _getState3$product.favorites, products = _getState3$product.products;

            if (toggle) {
              console.log("toggle on");
              filteredProducts = products.filter(function (product) {
                favorites.includes(product._id);
              });
              console.log("filtered products", filteredProducts);
              dispatch((0, _product.setFavoritesToggle)(toggle));
              dispatch((0, _product.setProducts)(filteredProducts));
            } else {
              console.log("toggle off");
              dispatch((0, _product.setFavoritesToggle)(false));
              dispatch(getProducts(1));
            }

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  };
};

exports.toggleFavorites = toggleFavorites;

var getProduct = function getProduct(id) {
  return function _callee5(dispatch) {
    var _ref2, data;

    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            dispatch((0, _product.setLoading)(true));
            _context5.prev = 1;
            _context5.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/products/".concat(id)));

          case 4:
            _ref2 = _context5.sent;
            data = _ref2.data;
            dispatch((0, _product.setProduct)(data));
            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](1);
            dispatch((0, _product.setError)(_context5.t0.response && _context5.t0.response.data.message ? _context5.t0.response.data.message : _context5.t0.message ? _context5.t0.message : 'An expected error has occured. Please try again later.'));

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[1, 9]]);
  };
};

exports.getProduct = getProduct;

var createProductReview = function createProductReview(productId, userId, comment, rating, title) {
  return function _callee6(dispatch, getState) {
    var _getState4, userInfo, config;

    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _getState4 = getState(), userInfo = _getState4.user.userInfo;
            _context6.prev = 1;
            config = {
              headers: {
                Authorization: "Bearer ".concat(userInfo.token),
                'Content-Type': 'application/json'
              }
            };
            _context6.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].post("/api/products/reviews/".concat(productId), {
              comment: comment,
              userId: userId,
              rating: rating,
              title: title
            }, config));

          case 5:
            dispatch((0, _product.productReviewed)(true));
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](1);
            dispatch((0, _product.setError)(_context6.t0.response && _context6.t0.response.data.message ? _context6.t0.response.data.message : _context6.t0.message ? _context6.t0.message : 'An expected error has occured. Please try again later.'));

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[1, 8]]);
  };
};

exports.createProductReview = createProductReview;

var resetProductError = function resetProductError() {
  return function _callee7(dispatch) {
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            dispatch((0, _product.resetError)());

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    });
  };
};

exports.resetProductError = resetProductError;
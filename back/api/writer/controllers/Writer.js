'use strict';

/**
 * Writer.js controller
 *
 * @description: A set of functions called "actions" for managing `Writer`.
 */

module.exports = {

  /**
   * Retrieve writer records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.writer.search(ctx.query);
    } else {
      return strapi.services.writer.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a writer record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.writer.fetch(ctx.params);
  },

  /**
   * Count writer records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.writer.count(ctx.query);
  },

  /**
   * Create a/an writer record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.writer.add(ctx.request.body);
  },

  /**
   * Update a/an writer record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.writer.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an writer record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.writer.remove(ctx.params);
  }
};

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BlogCards = ({ blogs }) => {
  return (
    <section className="py-24 px-4 sm:px-8 lg:px-16 bg-black">
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, i) => (
          <motion.div
            key={blog.slug} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            {/* Blurred Background */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl z-0"></div>

            {/* Blog Image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover relative z-10 rounded-t-2xl"
            />

            {/* Blog Content */}
            <div className="p-6 relative z-10">
              <h3 className="text-xl font-semibold text-white mb-2">{blog.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{blog.snippet}</p>
              <div className="flex justify-between items-center text-gray-400 text-xs mb-2">
                <span>{blog.author}</span>
                <span>{blog.date}</span>
              </div>

              {/*  Slug-based routing */}
              <Link
                to={`/blog/${blog.slug}`}
                className="text-[#7ebad1] font-semibold text-sm hover:underline"
              >
                Read More →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BlogCards;

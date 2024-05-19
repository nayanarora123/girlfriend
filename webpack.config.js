module.exports = {
    // other webpack config settings...
  
    module: {
      rules: [
        // other rules...
  
        {
            test: /\.(sass|less|css)$/,
            use: ["style-loader", "css-loader", 'sass-loader'],
          },
          
      ],
    },
  };
  
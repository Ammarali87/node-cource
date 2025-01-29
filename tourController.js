


exports.getToursWithin = catchAsync(async (req,res,next) => {  
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');
    
    // Example logic for fetching tours within the given distance
    console.log(`Finding tours within ${distance} ${unit} of (${lat}, ${lng})`);
    
    res.status(200).json({
        status: 'success',
        data: {
        tours: [] // Replace with actual logic
        }
    });
 })

  exports.getDistances = catchAsync(async (req, res, next) => {
    const { latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');
  
    const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

    if (!lat || !lng) {
      next(
        new AppError(
          'Please provide latitutr and longitude in the format lat,lng.',
          400
        )
      );
    }});

    const tour = await Tour.find({})

    res.status(200).json({
        status:"success",
        data:{
            data:tour
        }
    });
require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("./models/Category");
const Subcategory = require("./models/Subcategory");
const Item = require("./models/Item");

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("Database connected");
  //   await createCategory("Pants", "Men");
  //   await createSubcategory("Joogers", "Pants");
  await createItem(
    "ABC Jogger",
    "Joogers",
    ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    [
      "Oasis Blue",
      "Black",
      "Tru Navy",
      "Silver Drop",
      "Obsidian",
      "Nomad",
      "Army Green",
    ],
    138
  );

  mongoose.connection.close();
}

async function createCategory(name, gender) {
  const found = await Category.findOne({ name }).select("name").exec();
  if (found) {
    console.log(`${found.name} already exists`);
  } else {
    const category = new Category({
      name,
      gender,
    });
    await category.save();
    console.log(`${category.name} created`);
  }
}

async function createSubcategory(name, categoryName) {
  const category = await Category.findOne({ name: categoryName }).exec();
  if (!category) {
    console.log(`${categoryName} not found`);
  } else {
    const found = await Subcategory.findOne({ name, category: category._id })
      .select("name")
      .exec();
    if (found) {
      console.log(`${found.name} already exists`);
    } else {
      const subcategory = new Subcategory({
        name,
        category: category._id,
      });
      await subcategory.save();
      console.log(`${subcategory.name} created`);
    }
  }
}

async function createItem(name, subcategoryName, size, color, price, length) {
  const subcategory = await Subcategory.findOne({
    name: subcategoryName,
  }).exec();
  if (!subcategory) {
    console.log(`${subcategoryName} not found`);
  } else {
    const found = await Item.findOne({ name, subcategory: subcategory._id })
      .select("name")
      .exec();
    if (found) {
      console.log(`${found.name} already exists`);
    } else {
      const item = new Item({
        name,
        subcategory: subcategory._id,
        size_available: size,
        length_available: length,
        color_available: color,
        price,
      });
      await item.save();
      console.log(`${item.name} created`);
    }
  }
}

async function findItem(name) {
  const item = await Item.findOne({ name: "ABC Jogger" })
    .populate({ path: "subcategory", populate: { path: "category" } })
    .exec();
  console.log(item);
  let link = item.imageUrl.replaceAll(" ", "_");
  console.log(link);
}

main()
  .then(() => {
    console.log("Database connection closed");
  })
  .catch((err) => {
    console.log(err);
  });

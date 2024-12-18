USE [master]
GO
/****** Object:  Database [BookStoreWebDB]    Script Date: 11/30/2024 9:14:43 AM ******/
CREATE DATABASE [BookStoreWebDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BookStoreWebDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\BookStoreWebDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'BookStoreWebDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\BookStoreWebDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [BookStoreWebDB] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BookStoreWebDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BookStoreWebDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BookStoreWebDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BookStoreWebDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BookStoreWebDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BookStoreWebDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [BookStoreWebDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BookStoreWebDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BookStoreWebDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BookStoreWebDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BookStoreWebDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BookStoreWebDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BookStoreWebDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BookStoreWebDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BookStoreWebDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BookStoreWebDB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [BookStoreWebDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BookStoreWebDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BookStoreWebDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BookStoreWebDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BookStoreWebDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BookStoreWebDB] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [BookStoreWebDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BookStoreWebDB] SET RECOVERY FULL 
GO
ALTER DATABASE [BookStoreWebDB] SET  MULTI_USER 
GO
ALTER DATABASE [BookStoreWebDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BookStoreWebDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BookStoreWebDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BookStoreWebDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [BookStoreWebDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [BookStoreWebDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'BookStoreWebDB', N'ON'
GO
ALTER DATABASE [BookStoreWebDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [BookStoreWebDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [BookStoreWebDB]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 11/30/2024 9:14:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Blogs]    Script Date: 11/30/2024 9:14:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Blogs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](255) NOT NULL,
	[Content] [nvarchar](max) NOT NULL,
	[ImageURL] [nvarchar](500) NULL,
	[CreateAt] [datetime2](7) NOT NULL,
	[UpdateAt] [datetime2](7) NULL,
	[DeleteAt] [datetime2](7) NULL,
 CONSTRAINT [PK_Blogs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BookCategory]    Script Date: 11/30/2024 9:14:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BookCategory](
	[BooksId] [int] NOT NULL,
	[CategoriesId] [int] NOT NULL,
 CONSTRAINT [PK_BookCategory] PRIMARY KEY CLUSTERED 
(
	[BooksId] ASC,
	[CategoriesId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Books]    Script Date: 11/30/2024 9:14:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Books](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[BookCode] [nvarchar](50) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[Price] [float] NOT NULL,
	[PromotionalPrice] [float] NULL,
	[AuthorName] [nvarchar](255) NOT NULL,
	[PublisherId] [int] NOT NULL,
	[Stock] [int] NOT NULL,
	[PageCount] [int] NOT NULL,
	[Language] [nvarchar](max) NOT NULL,
	[AveragePoint] [float] NULL,
	[ClickCount] [int] NULL,
	[SoldCount] [int] NULL,
	[Slug] [nvarchar](max) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[UpdatedAt] [datetime2](7) NULL,
	[DeletedAt] [datetime2](7) NULL,
 CONSTRAINT [PK_Books] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Carts]    Script Date: 11/30/2024 9:14:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Carts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[BookId] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
 CONSTRAINT [PK_Carts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 11/30/2024 9:14:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NameCategory] [nvarchar](255) NOT NULL,
	[Slug] [nvarchar](max) NOT NULL,
	[ParentId] [int] NULL,
	[Description] [nvarchar](500) NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[UpdatedAt] [datetime2](7) NULL,
	[DeletedAt] [datetime2](7) NULL,
 CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Contacts]    Script Date: 11/30/2024 9:14:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contacts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Fullname] [nvarchar](100) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[Phone] [nvarchar](10) NOT NULL,
	[Message] [nvarchar](1000) NOT NULL,
	[CreateAt] [datetime2](7) NOT NULL,
	[DeletedAt] [datetime2](7) NULL,
 CONSTRAINT [PK_Contacts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Coupons]    Script Date: 11/30/2024 9:14:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Coupons](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](255) NOT NULL,
	[CouponCode] [nvarchar](50) NOT NULL,
	[StartDate] [datetime2](7) NOT NULL,
	[EndDate] [datetime2](7) NOT NULL,
	[Description] [nvarchar](1000) NULL,
	[PercentDiscount] [float] NULL,
	[discountPrice] [float] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreateAt] [datetime2](7) NULL,
	[UpdateAt] [datetime2](7) NULL,
	[DeleteAt] [datetime2](7) NULL,
	[Quantity] [int] NOT NULL,
 CONSTRAINT [PK_Coupons] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ImageBook]    Script Date: 11/30/2024 9:14:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImageBook](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ImageUrl] [nvarchar](max) NULL,
	[BookId] [int] NOT NULL,
 CONSTRAINT [PK_ImageBook] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Informations]    Script Date: 11/30/2024 9:14:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Informations](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Phone] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[Address] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[ShippingPolicy] [nvarchar](max) NULL,
	[Logo] [nvarchar](max) NULL,
	[FacebookLink] [nvarchar](max) NULL,
	[InstagramLink] [nvarchar](max) NULL,
 CONSTRAINT [PK_Informations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[InvoiceDetails]    Script Date: 11/30/2024 9:14:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InvoiceDetails](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Price] [float] NOT NULL,
	[Count] [int] NOT NULL,
	[InvoiceId] [int] NOT NULL,
	[BookId] [int] NOT NULL,
 CONSTRAINT [PK_InvoiceDetails] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Invoices]    Script Date: 11/30/2024 9:14:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Invoices](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InvoiceCode] [nvarchar](50) NOT NULL,
	[CustomerName] [nvarchar](255) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[PhoneNumber] [nvarchar](10) NOT NULL,
	[Note] [nvarchar](500) NULL,
	[OrderDate] [datetime2](7) NOT NULL,
	[TotalPrice] [float] NOT NULL,
	[Discount] [float] NOT NULL,
	[TotalAmount] [float] NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[PaymentId] [int] NULL,
	[CouponId] [int] NULL,
	[Status] [int] NOT NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[UpdatedAt] [datetime2](7) NULL,
	[DeletedAt] [datetime2](7) NULL,
 CONSTRAINT [PK_Invoices] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PaymentMethods]    Script Date: 11/30/2024 9:14:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaymentMethods](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_PaymentMethods] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Publishers]    Script Date: 11/30/2024 9:14:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Publishers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](500) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[UpdatedAt] [datetime2](7) NULL,
	[DeletedAt] [datetime2](7) NULL,
 CONSTRAINT [PK_Publishers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reviews]    Script Date: 11/30/2024 9:14:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reviews](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Comment] [nvarchar](1000) NOT NULL,
	[Rate] [int] NOT NULL,
	[InvoiceId] [int] NOT NULL,
	[BookId] [int] NOT NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[DeletedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Reviews] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Slideshows]    Script Date: 11/30/2024 9:14:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Slideshows](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ImageURL] [nvarchar](max) NOT NULL,
	[Link] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[DeletedAt] [datetime2](7) NULL,
	[UpdatedTime] [datetime2](7) NULL,
 CONSTRAINT [PK_Slideshows] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 11/30/2024 9:14:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [nvarchar](450) NOT NULL,
	[FullName] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[HashPassword] [nvarchar](max) NOT NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[Address] [nvarchar](max) NULL,
	[Gender] [bit] NULL,
	[Birthday] [datetime2](7) NULL,
	[IsActive] [bit] NOT NULL,
	[IsAdmin] [bit] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Wishlists]    Script Date: 11/30/2024 9:14:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Wishlists](
	[UserId] [nvarchar](450) NOT NULL,
	[BookId] [int] NOT NULL,
 CONSTRAINT [PK_Wishlists] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[BookId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241128082758_init', N'8.0.11')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241128094537_init1', N'8.0.11')
GO
INSERT [dbo].[BookCategory] ([BooksId], [CategoriesId]) VALUES (2, 2)
INSERT [dbo].[BookCategory] ([BooksId], [CategoriesId]) VALUES (3, 2)
INSERT [dbo].[BookCategory] ([BooksId], [CategoriesId]) VALUES (5, 2)
INSERT [dbo].[BookCategory] ([BooksId], [CategoriesId]) VALUES (4, 3)
INSERT [dbo].[BookCategory] ([BooksId], [CategoriesId]) VALUES (2, 4)
INSERT [dbo].[BookCategory] ([BooksId], [CategoriesId]) VALUES (3, 4)
INSERT [dbo].[BookCategory] ([BooksId], [CategoriesId]) VALUES (5, 4)
INSERT [dbo].[BookCategory] ([BooksId], [CategoriesId]) VALUES (4, 5)
INSERT [dbo].[BookCategory] ([BooksId], [CategoriesId]) VALUES (5, 5)
INSERT [dbo].[BookCategory] ([BooksId], [CategoriesId]) VALUES (1, 8)
INSERT [dbo].[BookCategory] ([BooksId], [CategoriesId]) VALUES (6, 8)
INSERT [dbo].[BookCategory] ([BooksId], [CategoriesId]) VALUES (1, 9)
INSERT [dbo].[BookCategory] ([BooksId], [CategoriesId]) VALUES (1, 10)
INSERT [dbo].[BookCategory] ([BooksId], [CategoriesId]) VALUES (6, 10)
INSERT [dbo].[BookCategory] ([BooksId], [CategoriesId]) VALUES (3, 12)
INSERT [dbo].[BookCategory] ([BooksId], [CategoriesId]) VALUES (6, 14)
GO
SET IDENTITY_INSERT [dbo].[Books] ON 

INSERT [dbo].[Books] ([Id], [BookCode], [Name], [Description], [Price], [PromotionalPrice], [AuthorName], [PublisherId], [Stock], [PageCount], [Language], [AveragePoint], [ClickCount], [SoldCount], [Slug], [IsActive], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (1, N'ABC2024', N'Tư Duy Ngược Dịch Chuyển Thế Giới - Originals: How Non - Conformists Move The World ', N'<p>abce</p>', 178000, 0, N'Adam Grant', 4, 300, 344, N'Tiếng Việt ', NULL, NULL, NULL, N'tu-duy-nguoc-dich-chuyen-the-gioi-originals-how-non-conformists-move-the-world', 1, CAST(N'2024-11-28T19:05:32.7286186' AS DateTime2), NULL, NULL)
INSERT [dbo].[Books] ([Id], [BookCode], [Name], [Description], [Price], [PromotionalPrice], [AuthorName], [PublisherId], [Stock], [PageCount], [Language], [AveragePoint], [ClickCount], [SoldCount], [Slug], [IsActive], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (2, N'ABC2022', N'Cây Cam Ngọt Của Tôi', N'<p class="ql-align-justify">“Vị chua chát của cái nghèo hòa trộn với vị ngọt ngào khi khám phá ra những điều khiến cuộc đời này đáng sống... một tác phẩm kinh điển của Brazil.”&nbsp;<strong>- Booklist</strong></p><p class="ql-align-justify">“Một cách nhìn cuộc sống gần như hoàn chỉnh từ con mắt trẻ thơ… có sức mạnh sưởi ấm và làm tan nát cõi lòng, dù người đọc ở lứa tuổi nào.”<strong>&nbsp;- The National</strong></p><p class="ql-align-justify">Hãy làm quen với Zezé, cậu bé tinh nghịch siêu hạng đồng thời cũng đáng yêu bậc nhất, với ước mơ lớn lên trở thành nhà thơ cổ thắt nơ bướm. Chẳng phải ai cũng công nhận khoản “đáng yêu” kia đâu nhé. Bởi vì, ở cái xóm ngoại ô nghèo ấy, nỗi khắc khổ bủa vây đã che mờ mắt người ta trước trái tim thiện lương cùng trí tưởng tượng tuyệt vời của cậu bé con năm tuổi.</p><p class="ql-align-justify">Có hề gì đâu bao nhiêu là hắt hủi, đánh mắng, vì Zezé đã có một người bạn đặc biệt để trút nỗi lòng: cây cam ngọt nơi vườn sau. Và cả một người bạn nữa, bằng xương bằng thịt, một ngày kia xuất hiện, cho cậu bé nhạy cảm khôn sớm biết thế nào là trìu mến, thế nào là nỗi đau, và mãi mãi thay đổi cuộc đời cậu.</p><p class="ql-align-justify">Mở đầu bằng những thanh âm trong sáng và kết thúc lắng lại trong những nốt trầm hoài niệm, Cây cam ngọt của tôi khiến ta nhận ra vẻ đẹp thực sự của cuộc sống đến từ những điều giản dị như bông hoa trắng của cái cây sau nhà, và rằng cuộc đời thật khốn khổ nếu thiếu đi lòng yêu thương và niềm trắc ẩn. Cuốn sách kinh điển này bởi thế không ngừng khiến trái tim người đọc khắp thế giới thổn thức, kể từ khi ra mắt lần đầu năm 1968 tại Brazil.</p><p class="ql-align-justify"><strong>TÁC GIẢ:</strong></p><p class="ql-align-justify">JOSÉ MAURO DE VASCONCELOS (1920-1984) là nhà văn người Brazil. Sinh ra trong một gia đình nghèo ở ngoại ô Rio de Janeiro, lớn lên ông phải làm đủ nghề để kiếm sống. Nhưng với tài kể chuyện thiên bẩm, trí nhớ phi thường, trí tưởng tượng tuyệt vời cùng vốn sống phong phú, José cảm thấy trong mình thôi thúc phải trở thành nhà văn nên đã bắt đầu sáng tác năm 22 tuổi. Tác phẩm nổi tiếng nhất của ông là tiểu thuyết mang màu sắc tự truyện Cây cam ngọt của tôi. Cuốn sách được đưa vào chương trình tiểu học của Brazil, được bán bản quyền cho hai mươi quốc gia và chuyển thể thành phim điện ảnh. Ngoài ra, José còn rất thành công trong vai trò diễn viên điện ảnh và biên kịch.</p><p><br></p>', 178000, 0, N'José Mauro de Vasconcelos', 5, 300, 344, N'Tiếng Việt ', NULL, 27, NULL, N'cay-cam-ngot-cua-toi', 1, CAST(N'2024-11-28T19:07:13.7910673' AS DateTime2), NULL, NULL)
INSERT [dbo].[Books] ([Id], [BookCode], [Name], [Description], [Price], [PromotionalPrice], [AuthorName], [PublisherId], [Stock], [PageCount], [Language], [AveragePoint], [ClickCount], [SoldCount], [Slug], [IsActive], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (3, N'8935235242173', N'Sưởi Ấm Mặt Trời - Phần Tiếp Theo Của Cây Cam Ngọt Của Tôi', N'<p class="ql-align-justify"><strong>Sưởi Ấm Mặt Trời</strong></p><p class="ql-align-justify">Zezé, cậu bé tinh nghịch siêu hạng đồng thời cũng đáng yêu bậc nhất ngày ngào giờ đã thoát khỏi cuộc sống nghèo khó, cũng không còn phải chịu cảnh bị đánh đập thường xuyên như trong quá khứ. Cậu đã chuyển đến Natal sống cùng gia đình cha đỡ đầu, được học ở một ngôi trường tốt, dần dần tiến bộ cả về mặt trí tuệ lẫn thể chất. Nhưng nỗi đau mất mát vẫn đè nặng lên trái tim cậu và Zezé vẫn là một cậu nhóc “ hầu như lúc nào cũng buồn”, thậm chí “có lẽ là một trong những cậu nhóc buồn nhất quả đất”.</p><p class="ql-align-justify">Nhưng, may thay, Zezé đã tìm được những người bạn mới – cả ở đời thực lẫn trong tưởng tượng – luôn thấu hiểu và sát cánh bên cậu, cùng cậu đi qua hết thày những niềm vui cùng nỗi buồn, những khổ sở, thất vọng, những phiêu lưu mạo hiểm, giúp cậu đối thoại với cuộc sống muôn màu muôn vẻ, với nội tâm đầy mâu thuẫn và đồng thời với cả nỗi buồn thương sâu thẳm trong tâm hồn.</p><p class="ql-align-justify">Sâu lắng, day dứt và có những khi buồn đến thắt lòng, nhưng đồng thời,&nbsp;<strong><em>Sưởi ấm mặt trời</em></strong>&nbsp;cũng tràn ngập hơi thở trẻ trung, trong sáng, tràn đầy sức sống và tình yêu thương.</p><p><br></p>', 160000, 0, N'Joses Mauro De Vasconcelos', 7, 200, 376, N'Tiếng Việt ', NULL, 1, NULL, N'suoi-am-mat-troi-phan-tiep-theo-cua-cay-cam-ngot-cua-toi', 1, CAST(N'2024-11-29T08:45:54.0614647' AS DateTime2), NULL, NULL)
INSERT [dbo].[Books] ([Id], [BookCode], [Name], [Description], [Price], [PromotionalPrice], [AuthorName], [PublisherId], [Stock], [PageCount], [Language], [AveragePoint], [ClickCount], [SoldCount], [Slug], [IsActive], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (4, N'9786043651591', N'Lén Nhặt Chuyện Đời', N'<p class="ql-align-justify"><strong>Lén Nhặt Chuyện Đời</strong></p><p class="ql-align-justify">Tại vùng ngoại ô xứ Đan Mạch xưa, người thợ kim hoàn Per Enevoldsen đã cho ra mắt một món đồ trang sức lấy ý tưởng từ Pandora - người phụ nữ đầu tiên của nhân loại mang vẻ đẹp như một ngọc nữ phù dung, kiêu sa và bí ẩn trong Thần thoại Hy Lạp. Vòng Pandora được kết hợp từ một sợi dây bằng vàng, bạc hoặc bằng da cùng với những viên charm được chế tác đa dạng, tỉ mỉ. Ý tưởng của ông, mỗi viên charm như một câu chuyện, một kỷ niệm đáng nhớ của người sở hữu chiếc vòng. Khi một viên charm được thêm vào sợi Pandora là cuộc đời lại có thêm một ký ức cần lưu lại để nhớ, để thương, để trân trọng. Lén nhặt chuyện đời ra mắt trong khoảng thời gian chông chênh nhất của bản thân, hay nói cách khác là một cậu bé mới lớn, vừa bước ra khỏi cái vỏ bọc vốn an toàn của mình. Những câu chuyện trong Lén nhặt chuyện đời là những câu chuyện tôi được nghe kể lại, hoặc vô tình bắt gặp, hoặc nhặt nhạnh ở đâu đó trong miền ký ức rời rạc của quá khứ, không theo một trình tự hay một thời gian nào nhất định.</p><p class="ql-align-justify">Mỗi một câu chuyện là một viên charm lấp lánh, kiêu kỳ, có sức hút mạnh mẽ đối với một người trẻ như tôi luôn tò mò với những điều dung dị trong cuộc sống. Tôi âm thầm nhặt những viên charm ấy về, kết thành sợi Pandora cho chính mình. Lén ở đây không phải là một cái gì đó vụng trộm, âm thầm sợ người khác phát hiện. Mà nó là lặng lẽ. Tôi lặng lẽ nghe, lặng lẽ quan sát, lặng lẽ đi tìm và lặng lẽ viết nên quyển sách này. Tôi vẫn thích dùng từ Lén hơn, vì đơn giản, tôi thấy bản thân mình trong đó. Lén nhặt chuyện đời được chia thành năm chương: chương thứ nhất nói về tình yêu của cả giới trẻ và người tu sĩ; chương thứ hai viết về gia đình; chương thứ ba dành cho những người trẻ; chương thứ tư là những câu chuyện bên đời, những bài tâm sự của người tu sĩ; chương năm là thơ và chương cuối cùng là tâm sự của bản thân khi tôi đã về già. Nếu ai nghĩ Lén nhặt chuyện đời sẽ giảng thuyết về chân lý, định hướng cho người trẻ hay chữa lành những vết thương… thì đã tìm sai chỗ, bản thân chưa bao giờ nghĩ quyển sách này sẽ làm được điều đó.</p><p class="ql-align-justify">Đây chỉ là những câu chuyện, những suy nghĩ về cuộc đời của một người trẻ đang chông chênh. Đôi khi, tôi hóa thành một ông già của năm chục năm sau kể về những ký ức thời vụng dại. Chỉ mong sao, đọc Lén nhặt chuyện đời, người ta có thể tìm được đâu đó những viên charm phù hợp với bản thân mình. Quyển sách này sẽ là dấu ấn lớn nhất đối với cuộc đời của bản thân. Mỗi bài viết là một viên charm của Pandora Lén nhặt chuyện đời và Lén nhặt chuyện đời cũng sẽ là một viên charm lấp lánh trong sợi Pandora của cuộc đời tôi. Quyển sách này, xin được nhớ về những người Thầy của tôi, về Từ Quang, về gia đình, và tất cả những ai đã hiện diện trong thời thanh xuân của tôi. Để nhắc rằng, tôi đã từng có mặt trong cuộc đời của họ, và họ có mặt trong quyển sách này của tôi.</p><p class="ql-align-justify">Cảm ơn đã tìm đến sợi Pandora Lén nhặt chuyện đời, và nào, hãy cùng tôi bắt đầu đi tìm những viên charm, nhặt lên và xâu vào sợi Pandora của mình thôi!</p><p><br></p>', 85000, 38250, N'Mộc Trầm', 6, 300, 213, N'Tiếng Việt ', NULL, 1, NULL, N'len-nhat-chuyen-doi', 1, CAST(N'2024-11-29T08:49:34.4821963' AS DateTime2), NULL, NULL)
INSERT [dbo].[Books] ([Id], [BookCode], [Name], [Description], [Price], [PromotionalPrice], [AuthorName], [PublisherId], [Stock], [PageCount], [Language], [AveragePoint], [ClickCount], [SoldCount], [Slug], [IsActive], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (5, N'8935235226272', N'Nhà Giả Kim (Tái Bản 2020)', N'<p class="ql-align-justify"><em>Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ và con người</em>.&nbsp;</p><p class="ql-align-justify">Tiểu thuyết&nbsp;<em>Nhà giả kim&nbsp;</em>của Paulo Coelho như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông. Trong lần xuất bản đầu tiên tại Brazil vào năm 1988, sách chỉ bán được 900 bản. Nhưng, với số phận đặc biệt của cuốn sách dành cho toàn nhân loại, vượt ra ngoài biên giới quốc gia,&nbsp;<em>Nhà giả kim&nbsp;</em>đã làm rung động hàng triệu tâm hồn, trở thành một trong những cuốn sách bán chạy nhất mọi thời đại, và có thể làm thay đổi cuộc đời người đọc.</p><p class="ql-align-justify">“Nhưng nhà luyện kim đan không quan tâm mấy đến những điều ấy. Ông đã từng thấy nhiều người đến rồi đi, trong khi ốc đảo và sa mạc vẫn là ốc đảo và sa mạc. Ông đã thấy vua chúa và kẻ ăn xin đi qua biển cát này, cái biển cát thường xuyên thay hình đổi dạng vì gió thổi nhưng vẫn mãi mãi là biển cát mà ông đã biết từ thuở nhỏ. Tuy vậy, tự đáy lòng mình, ông không thể không cảm thấy vui trước hạnh phúc của mỗi người lữ khách, sau bao ngày chỉ có cát vàng với trời xanh nay được thấy chà là xanh tươi hiện ra trước mắt. ‘Có thể Thượng đế tạo ra sa mạc chỉ để cho con người biết quý trọng cây chà là,’ ông nghĩ.”</p><p class="ql-align-justify">- Trích&nbsp;<em>Nhà giả kim</em></p><p class="ql-align-justify"><strong>Nhận định</strong></p><p class="ql-align-justify">“Sau Garcia Márquez, đây là nhà văn Mỹ Latinh được đọc nhiều nhất thế giới.”&nbsp;<em>- The Economist</em>, London, Anh</p><p class="ql-align-justify">&nbsp;</p><p class="ql-align-justify">“Santiago có khả năng cảm nhận bằng trái tim như&nbsp;<em>Hoàng tử bé</em>&nbsp;của Saint-Exupéry.”&nbsp;<em>- Frankfurter Allgemeine Zeitung, Đức</em></p><p><br></p>', 79000, 53000, N'Paulo Coelho - Lê Chu Cầu dịch', 7, 200, 227, N'Tiếng Việt ', NULL, 2, NULL, N'nha-gia-kim-tai-ban-2020', 1, CAST(N'2024-11-29T08:52:29.4103791' AS DateTime2), NULL, NULL)
INSERT [dbo].[Books] ([Id], [BookCode], [Name], [Description], [Price], [PromotionalPrice], [AuthorName], [PublisherId], [Stock], [PageCount], [Language], [AveragePoint], [ClickCount], [SoldCount], [Slug], [IsActive], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (6, N'8934974165569', N'48 Nguyên Tắc Chủ Chốt Của Quyền Lực (Tái Bản 2020)', N'<p class="ql-align-justify">Quyền lực có sức hấp dẫn vô cùng mạnh mẽ đối với con người trong mọi thời, ở mọi nơi, với mọi giai tầng. Lịch sử xét cho cùng là cuộc đấu tranh triền miên để giành cho bằng được quyền lực cai trị của các tập đoàn thống trị, từ cổ chí kim, từ đông sang tây.</p><p class="ql-align-justify">Quyền lực là thứ mà rất nhiều người mong muốn nhưng không phải ai cũng dễ dàng đạt được. Vươn lên những vị trí cao hơn trong thang bậc xã hội thường được xem là một khát khao rất con người. Nhưng, liệu có phải chỉ những tài năng xuất chúng mới có thể đạt được điều đó? Không hẳn vậy. Bởi ít ai biết rằng, để giành được một vị trí quyền lực thực tế vẫn mang tính công thức.</p><p class="ql-align-justify">Qua nghiên cứu lịch sử nhân loại, với những nhân vật có quyền lực nhất tự cổ chí kim, Robert Greene đã khái quát nên 48 nguyên tắc tạo nên quyền lực một cách có cơ sở khoa học. Mỗi nguyên tắc đều được tác giả phân tích, giải thích rõ ràng, mang tính thuyết phục cao và cực kỳ hấp dẫn. Một số quy luật đòi hỏi sự khôn ngoan sắc sảo, một số cần sự lén lút và một số khác hoàn toàn vắng mặt lòng thương xót… Nhưng dù bạn thích hay không thích, tất cả những quy luật này đều có nhiều ứng dụng trong các tình huống thực tế của cuộc đời.</p><p class="ql-align-justify">Phi luân lý, xảo quyệt, nhẫn tâm và dồi dào tư liệu, “48 nguyên tắc chủ chốt của quyền lực” của Robert Greene hoàn toàn có thể giúp bạn vươn tới những đỉnh cao quyền lực và cũng có thể giúp bạn đạt được tột đỉnh vinh quang.</p><p><br></p>', 200000, 144000, N'Robert Greene', 4, 150, 504, N'Tiếng Việt ', NULL, 10, NULL, N'48-nguyen-tac-chu-chot-cua-quyen-luc-tai-ban-2020', 1, CAST(N'2024-11-29T08:58:21.7088992' AS DateTime2), NULL, NULL)
SET IDENTITY_INSERT [dbo].[Books] OFF
GO
SET IDENTITY_INSERT [dbo].[Categories] ON 

INSERT [dbo].[Categories] ([Id], [NameCategory], [Slug], [ParentId], [Description], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (1, N'Văn học ', N'van-hoc', NULL, NULL, CAST(N'2024-11-29T01:38:56.0415132' AS DateTime2), NULL, NULL)
INSERT [dbo].[Categories] ([Id], [NameCategory], [Slug], [ParentId], [Description], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (2, N'Tiểu thuyết ', N'tieu-thuyet', 1, NULL, CAST(N'2024-11-29T01:39:13.6677725' AS DateTime2), NULL, NULL)
INSERT [dbo].[Categories] ([Id], [NameCategory], [Slug], [ParentId], [Description], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (3, N'Văn học trong nước ', N'van-hoc-trong-nuoc', 1, NULL, CAST(N'2024-11-29T01:39:26.3834787' AS DateTime2), NULL, NULL)
INSERT [dbo].[Categories] ([Id], [NameCategory], [Slug], [ParentId], [Description], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (4, N'Văn học nước ngoài', N'van-hoc-nuoc-ngoai', 1, NULL, CAST(N'2024-11-29T01:39:38.2230550' AS DateTime2), NULL, NULL)
INSERT [dbo].[Categories] ([Id], [NameCategory], [Slug], [ParentId], [Description], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (5, N'Truyện ngắn', N'truyen-ngan', 1, NULL, CAST(N'2024-11-29T01:40:01.8685762' AS DateTime2), NULL, NULL)
INSERT [dbo].[Categories] ([Id], [NameCategory], [Slug], [ParentId], [Description], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (6, N'Giả tưởng - Kinh dị', N'gia-tuong---kinh-di', 1, NULL, CAST(N'2024-11-29T01:40:35.4175523' AS DateTime2), NULL, NULL)
INSERT [dbo].[Categories] ([Id], [NameCategory], [Slug], [ParentId], [Description], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (7, N'Kinh doanh', N'kinh-doanh', NULL, NULL, CAST(N'2024-11-29T01:40:40.4554586' AS DateTime2), NULL, NULL)
INSERT [dbo].[Categories] ([Id], [NameCategory], [Slug], [ParentId], [Description], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (8, N'Đầu tư ', N'dau-tu', 7, NULL, CAST(N'2024-11-29T01:40:50.6633131' AS DateTime2), NULL, NULL)
INSERT [dbo].[Categories] ([Id], [NameCategory], [Slug], [ParentId], [Description], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (9, N'Chứng khoán', N'chung-khoan', 7, NULL, CAST(N'2024-11-29T01:40:59.6525893' AS DateTime2), NULL, NULL)
INSERT [dbo].[Categories] ([Id], [NameCategory], [Slug], [ParentId], [Description], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (10, N'Quản lí - Lãnh đạo', N'quan-li---lanh-dao', 7, NULL, CAST(N'2024-11-29T01:41:27.4382610' AS DateTime2), NULL, NULL)
INSERT [dbo].[Categories] ([Id], [NameCategory], [Slug], [ParentId], [Description], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (11, N'Markerting - Bán hàng', N'markerting---ban-hang', 7, NULL, CAST(N'2024-11-29T01:41:51.0069535' AS DateTime2), NULL, NULL)
INSERT [dbo].[Categories] ([Id], [NameCategory], [Slug], [ParentId], [Description], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (12, N'Tác phẩm kinh điển', N'tac-pham-kinh-dien', 1, NULL, CAST(N'2024-11-29T01:42:46.0246568' AS DateTime2), NULL, NULL)
INSERT [dbo].[Categories] ([Id], [NameCategory], [Slug], [ParentId], [Description], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (13, N'Kế toán - Kiểm toán', N'ke-toan---kiem-toan', 7, NULL, CAST(N'2024-11-29T15:56:09.7038150' AS DateTime2), NULL, NULL)
INSERT [dbo].[Categories] ([Id], [NameCategory], [Slug], [ParentId], [Description], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (14, N'Ngoại thương', N'ngoai-thuong', 7, NULL, CAST(N'2024-11-29T15:56:28.3378977' AS DateTime2), NULL, NULL)
SET IDENTITY_INSERT [dbo].[Categories] OFF
GO
SET IDENTITY_INSERT [dbo].[ImageBook] ON 

INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (1, N'Books\tu-duy-nguoc-dich-chuyen-the-gioi---originals-how-non---conformists-move-the-world\26fcd968-5d2a-43fe-91dc-d71ece0333e2.webp', 1)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (2, N'Books\tu-duy-nguoc-dich-chuyen-the-gioi---originals-how-non---conformists-move-the-world\3533e8f3-e47d-4cb3-bb45-5ce0b5560f0d.webp', 1)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (3, N'Books\tu-duy-nguoc-dich-chuyen-the-gioi---originals-how-non---conformists-move-the-world\6ab7cad6-1f83-4b49-a2e3-bd3f305cb13d.webp', 1)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (4, N'Books\cay-cam-ngot-cua-toi\e1427cbd-d16e-4e63-87e7-5038aae1a637.webp', 2)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (5, N'Books\cay-cam-ngot-cua-toi\1958d2cb-a418-4ace-af10-4b14e358bb69.webp', 2)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (6, N'Books\cay-cam-ngot-cua-toi\2b06d7c4-c573-4cff-93e2-02b0d4512614.webp', 2)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (7, N'Books\suoi-am-mat-troi---phan-tiep-theo-cua-cay-cam-ngot-cua-toi\46ebd3b4-4b08-4a56-abb1-28e365eaf8f0.webp', 3)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (8, N'Books\suoi-am-mat-troi---phan-tiep-theo-cua-cay-cam-ngot-cua-toi\1a71fce3-913f-4d3c-a4c3-0b002673a7bf.webp', 3)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (9, N'Books\suoi-am-mat-troi---phan-tiep-theo-cua-cay-cam-ngot-cua-toi\0316796c-084f-436b-aee9-1b456666ffca.webp', 3)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (10, N'Books\len-nhat-chuyen-doi\66489c4e-0ba7-4c45-9c22-97b5f481a973.webp', 4)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (11, N'Books\len-nhat-chuyen-doi\ff22f603-c55b-4fa1-91f9-3b0fd9d040ac.webp', 4)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (12, N'Books\len-nhat-chuyen-doi\6bb6cfc5-7a1e-40e3-aa5f-b27884602152.webp', 4)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (13, N'Books\nha-gia-kim-tai-ban-2020\822d8532-a679-4473-8eda-fddff56648b7.webp', 5)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (14, N'Books\nha-gia-kim-tai-ban-2020\60dda5f1-793c-457d-a365-5ed865f8343e.webp', 5)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (15, N'Books\nha-gia-kim-tai-ban-2020\314863e5-1c91-41f0-911e-ce1823f59798.webp', 5)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (16, N'Books\nha-gia-kim-tai-ban-2020\7fadaa1e-889f-4e19-800d-d3da0b44ffe6.webp', 5)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (17, N'Books\48-nguyen-tac-chu-chot-cua-quyen-luc-tai-ban-2020\f2d8b12f-65e9-4428-a2ed-ed8042be801f.webp', 6)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (18, N'Books\48-nguyen-tac-chu-chot-cua-quyen-luc-tai-ban-2020\0116cde4-1fff-4de5-bc52-77bb78742a0a.webp', 6)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (19, N'Books\48-nguyen-tac-chu-chot-cua-quyen-luc-tai-ban-2020\759320fe-1e24-497e-9dcf-b588ebf5ab0c.webp', 6)
INSERT [dbo].[ImageBook] ([Id], [ImageUrl], [BookId]) VALUES (20, N'Books\48-nguyen-tac-chu-chot-cua-quyen-luc-tai-ban-2020\dcd777b6-9410-4ee3-bf58-129cc380586e.webp', 6)
SET IDENTITY_INSERT [dbo].[ImageBook] OFF
GO
SET IDENTITY_INSERT [dbo].[Informations] ON 

INSERT [dbo].[Informations] ([Id], [Name], [Phone], [Email], [Address], [Description], [ShippingPolicy], [Logo], [FacebookLink], [InstagramLink]) VALUES (2, N'Công ty Cổ Phần ABC', N'0902427957', N'tinnguyentrung2002@gmail.com', N'62 Huỳnh Khúc Kháng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh', N'<p>Công Ty Cổ Phần ABC là một đơn vị chuyên cung cấp các loại sách phong phú và chất lượng cao, nhằm đáp ứng nhu cầu đọc sách của độc giả ở mọi độ tuổi và sở thích. Với sứ mệnh lan tỏa tri thức, công ty luôn cam kết:<span class="ql-cursor">﻿</span></p><ol><li><strong>Sản phẩm đa dạng</strong>: Cung cấp nhiều thể loại sách, từ văn học, khoa học, kỹ năng sống đến sách giáo dục, truyện tranh, v.v.</li><li><strong>Chất lượng đảm bảo</strong>: Đảm bảo sách chính hãng, không bán sách lậu hay sách giả, mang đến trải nghiệm đọc tốt nhất.</li><li><strong>Dịch vụ tận tâm</strong>: Hỗ trợ khách hàng từ khâu tư vấn, mua sắm đến giao hàng nhanh chóng và tiện lợi.</li><li><strong>Giá cả hợp lý</strong>: Cạnh tranh và có nhiều chương trình ưu đãi để tri ân khách hàng.</li><li><strong>Phát triển văn hóa đọc</strong>: Tổ chức các chương trình khuyến đọc, hội sách, và giao lưu tác giả để kết nối cộng đồng yêu sách.</li></ol><p><br></p>', N'<h3><strong>Chính sách vận chuyển tại Việt Nam</strong><span class="ql-cursor">﻿</span></h3><p>Công Ty Cổ Phần ABC cam kết mang đến dịch vụ vận chuyển nhanh chóng, an toàn và tiện lợi cho mọi khách hàng trên toàn quốc. Dưới đây là các chính sách vận chuyển áp dụng:</p><p><br></p><h4><strong>1. Khu vực giao hàng</strong></h4><ul><li>Giao hàng trên toàn quốc, bao gồm cả các vùng sâu, vùng xa và hải đảo.</li><li>Hợp tác với các đơn vị vận chuyển uy tín như Viettel Post, GHTK, J&amp;T Express, Shopee Express, v.v.</li></ul><h4><strong>2. Thời gian giao hàng</strong></h4><ul><li><strong>Khu vực nội thành</strong>: 1-3 ngày làm việc.</li><li><strong>Khu vực ngoại thành và các tỉnh thành khác</strong>: 3-7 ngày làm việc.</li><li>Thời gian giao hàng có thể thay đổi tùy thuộc vào tình trạng thời tiết, địa điểm nhận hàng, và các yếu tố bất khả kháng khác.</li></ul><h4><strong>3. Phí vận chuyển</strong></h4><ul><li><strong>Miễn phí vận chuyển</strong>: Đơn hàng từ 500.000 VNĐ trở lên (áp dụng toàn quốc).</li><li>Đối với đơn hàng dưới 500.000 VNĐ, phí vận chuyển sẽ được tính dựa trên:</li><li class="ql-indent-1">Trọng lượng hàng hóa.</li><li class="ql-indent-1">Khoảng cách giao hàng (theo chính sách của đơn vị vận chuyển).</li><li class="ql-indent-1">Chi tiết phí sẽ được hiển thị trong quá trình đặt hàng.</li></ul><h4><strong>4. Chính sách giao hàng</strong></h4><ul><li><strong>Kiểm tra hàng trước khi nhận</strong>:</li><li class="ql-indent-1">Khách hàng được phép mở kiện hàng để kiểm tra trước khi thanh toán.</li><li class="ql-indent-1">Nếu phát hiện sản phẩm lỗi hoặc không đúng như đơn đặt hàng, khách hàng có quyền từ chối nhận hàng.</li><li><strong>Giao hàng nhiều lần</strong>:</li><li class="ql-indent-1">Trong trường hợp giao hàng lần đầu không thành công (khách hàng không nhận hàng, không liên lạc được, v.v.), đơn vị vận chuyển sẽ liên hệ để giao lại lần 2.</li><li class="ql-indent-1">Nếu vẫn không giao được, đơn hàng sẽ được hoàn trả về kho.</li></ul><h4><strong>5. Chính sách hỗ trợ</strong></h4><ul><li><strong>Thay đổi địa chỉ nhận hàng</strong>: Khách hàng cần thông báo trước khi đơn hàng được giao đi.</li><li><strong>Hỗ trợ xử lý khiếu nại</strong>:</li><li class="ql-indent-1">Nếu hàng hóa bị hư hỏng trong quá trình vận chuyển, công ty sẽ hỗ trợ đổi/trả hàng miễn phí.</li><li class="ql-indent-1">Khách hàng liên hệ qua hotline hoặc email trong vòng 48 giờ kể từ khi nhận hàng để được hỗ trợ nhanh chóng.</li></ul><p><br></p>', N'56f9fe28-ae63-40c7-8f50-055ddce1b19e.png', N'https://www.facebook.com/zztinnguyenzz/', N'https://www.facebook.com/zztinnguyenzz/')
SET IDENTITY_INSERT [dbo].[Informations] OFF
GO
SET IDENTITY_INSERT [dbo].[Publishers] ON 

INSERT [dbo].[Publishers] ([Id], [Name], [Description], [IsActive], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (1, N'NXB Kim Đồng', NULL, 1, CAST(N'2024-11-28T18:26:12.3236555' AS DateTime2), NULL, NULL)
INSERT [dbo].[Publishers] ([Id], [Name], [Description], [IsActive], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (2, N'NXB Quốc Gia', NULL, 1, CAST(N'2024-11-28T18:26:17.2525793' AS DateTime2), NULL, NULL)
INSERT [dbo].[Publishers] ([Id], [Name], [Description], [IsActive], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (3, N'NXB Công Thương', NULL, 1, CAST(N'2024-11-28T18:26:21.9384619' AS DateTime2), NULL, NULL)
INSERT [dbo].[Publishers] ([Id], [Name], [Description], [IsActive], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (4, N'NXB Trẻ', NULL, 1, CAST(N'2024-11-28T18:26:28.6382599' AS DateTime2), CAST(N'2024-11-28T18:26:45.5928917' AS DateTime2), NULL)
INSERT [dbo].[Publishers] ([Id], [Name], [Description], [IsActive], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (5, N'NXB Tổng Hợp TPHCM', NULL, 1, CAST(N'2024-11-28T18:26:37.0776274' AS DateTime2), NULL, NULL)
INSERT [dbo].[Publishers] ([Id], [Name], [Description], [IsActive], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (6, N'NXB Thế Giới', NULL, 1, CAST(N'2024-11-28T18:26:44.2282778' AS DateTime2), NULL, NULL)
INSERT [dbo].[Publishers] ([Id], [Name], [Description], [IsActive], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (7, N'NXB Hội Nhà Văn', NULL, 1, CAST(N'2024-11-29T08:44:36.6756650' AS DateTime2), CAST(N'2024-11-29T08:44:39.1718834' AS DateTime2), NULL)
SET IDENTITY_INSERT [dbo].[Publishers] OFF
GO
SET IDENTITY_INSERT [dbo].[Slideshows] ON 

INSERT [dbo].[Slideshows] ([Id], [ImageURL], [Link], [Description], [IsActive], [CreatedAt], [DeletedAt], [UpdatedTime]) VALUES (1, N'Slideshows\97bf8af8-d352-4e28-a63d-8c18784a370b.webp', N'http://localhost:3000/khuyen-mai', NULL, 1, CAST(N'2024-11-29T01:36:40.3900964' AS DateTime2), NULL, NULL)
SET IDENTITY_INSERT [dbo].[Slideshows] OFF
GO
INSERT [dbo].[Users] ([Id], [FullName], [Email], [HashPassword], [PhoneNumber], [Address], [Gender], [Birthday], [IsActive], [IsAdmin]) VALUES (N'0107dbe1-516f-47e2-ada7-b7dc0e606c13', N'Nguyễn Trung Tín', N'ngtrtin1601@gmail.com', N'$2a$11$h0jx7Q2JmnCsQhXPJkb.p.sDo4c8Bj5MecQllOBokN0VnD7BSJtVe', N'0902427951', NULL, NULL, NULL, 1, 0)
INSERT [dbo].[Users] ([Id], [FullName], [Email], [HashPassword], [PhoneNumber], [Address], [Gender], [Birthday], [IsActive], [IsAdmin]) VALUES (N'b59ffbbd-4cde-4f7c-9198-d1ae557f8349', N'Nguyễn Trung Tín', N'tinnguyentrung2002@gmail.com', N'$2a$11$4Hz1DQ8JDtkAs/YIbu0hiuT9EP1emSUjFhN7Z3mpR6Gs.Sw/d0ZLS', N'0902427957', NULL, NULL, NULL, 1, 1)
GO
INSERT [dbo].[Wishlists] ([UserId], [BookId]) VALUES (N'0107dbe1-516f-47e2-ada7-b7dc0e606c13', 1)
INSERT [dbo].[Wishlists] ([UserId], [BookId]) VALUES (N'0107dbe1-516f-47e2-ada7-b7dc0e606c13', 4)
INSERT [dbo].[Wishlists] ([UserId], [BookId]) VALUES (N'0107dbe1-516f-47e2-ada7-b7dc0e606c13', 5)
GO
/****** Object:  Index [IX_BookCategory_CategoriesId]    Script Date: 11/30/2024 9:14:43 AM ******/
CREATE NONCLUSTERED INDEX [IX_BookCategory_CategoriesId] ON [dbo].[BookCategory]
(
	[CategoriesId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Books_PublisherId]    Script Date: 11/30/2024 9:14:43 AM ******/
CREATE NONCLUSTERED INDEX [IX_Books_PublisherId] ON [dbo].[Books]
(
	[PublisherId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Carts_BookId]    Script Date: 11/30/2024 9:14:43 AM ******/
CREATE NONCLUSTERED INDEX [IX_Carts_BookId] ON [dbo].[Carts]
(
	[BookId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Carts_UserId]    Script Date: 11/30/2024 9:14:43 AM ******/
CREATE NONCLUSTERED INDEX [IX_Carts_UserId] ON [dbo].[Carts]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Categories_ParentId]    Script Date: 11/30/2024 9:14:43 AM ******/
CREATE NONCLUSTERED INDEX [IX_Categories_ParentId] ON [dbo].[Categories]
(
	[ParentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_ImageBook_BookId]    Script Date: 11/30/2024 9:14:43 AM ******/
CREATE NONCLUSTERED INDEX [IX_ImageBook_BookId] ON [dbo].[ImageBook]
(
	[BookId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_InvoiceDetails_BookId]    Script Date: 11/30/2024 9:14:43 AM ******/
CREATE NONCLUSTERED INDEX [IX_InvoiceDetails_BookId] ON [dbo].[InvoiceDetails]
(
	[BookId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_InvoiceDetails_InvoiceId]    Script Date: 11/30/2024 9:14:43 AM ******/
CREATE NONCLUSTERED INDEX [IX_InvoiceDetails_InvoiceId] ON [dbo].[InvoiceDetails]
(
	[InvoiceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Invoices_CouponId]    Script Date: 11/30/2024 9:14:43 AM ******/
CREATE NONCLUSTERED INDEX [IX_Invoices_CouponId] ON [dbo].[Invoices]
(
	[CouponId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Invoices_PaymentId]    Script Date: 11/30/2024 9:14:43 AM ******/
CREATE NONCLUSTERED INDEX [IX_Invoices_PaymentId] ON [dbo].[Invoices]
(
	[PaymentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Invoices_UserId]    Script Date: 11/30/2024 9:14:43 AM ******/
CREATE NONCLUSTERED INDEX [IX_Invoices_UserId] ON [dbo].[Invoices]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Reviews_BookId]    Script Date: 11/30/2024 9:14:43 AM ******/
CREATE NONCLUSTERED INDEX [IX_Reviews_BookId] ON [dbo].[Reviews]
(
	[BookId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Reviews_InvoiceId]    Script Date: 11/30/2024 9:14:43 AM ******/
CREATE NONCLUSTERED INDEX [IX_Reviews_InvoiceId] ON [dbo].[Reviews]
(
	[InvoiceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Wishlists_BookId]    Script Date: 11/30/2024 9:14:43 AM ******/
CREATE NONCLUSTERED INDEX [IX_Wishlists_BookId] ON [dbo].[Wishlists]
(
	[BookId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Reviews] ADD  DEFAULT ('0001-01-01T00:00:00.0000000') FOR [DeletedAt]
GO
ALTER TABLE [dbo].[BookCategory]  WITH CHECK ADD  CONSTRAINT [FK_BookCategory_Books_BooksId] FOREIGN KEY([BooksId])
REFERENCES [dbo].[Books] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BookCategory] CHECK CONSTRAINT [FK_BookCategory_Books_BooksId]
GO
ALTER TABLE [dbo].[BookCategory]  WITH CHECK ADD  CONSTRAINT [FK_BookCategory_Categories_CategoriesId] FOREIGN KEY([CategoriesId])
REFERENCES [dbo].[Categories] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BookCategory] CHECK CONSTRAINT [FK_BookCategory_Categories_CategoriesId]
GO
ALTER TABLE [dbo].[Books]  WITH CHECK ADD  CONSTRAINT [FK_Books_Publishers_PublisherId] FOREIGN KEY([PublisherId])
REFERENCES [dbo].[Publishers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Books] CHECK CONSTRAINT [FK_Books_Publishers_PublisherId]
GO
ALTER TABLE [dbo].[Carts]  WITH CHECK ADD  CONSTRAINT [FK_Carts_Books_BookId] FOREIGN KEY([BookId])
REFERENCES [dbo].[Books] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Carts] CHECK CONSTRAINT [FK_Carts_Books_BookId]
GO
ALTER TABLE [dbo].[Carts]  WITH CHECK ADD  CONSTRAINT [FK_Carts_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Carts] CHECK CONSTRAINT [FK_Carts_Users_UserId]
GO
ALTER TABLE [dbo].[Categories]  WITH CHECK ADD  CONSTRAINT [FK_Categories_Categories_ParentId] FOREIGN KEY([ParentId])
REFERENCES [dbo].[Categories] ([Id])
GO
ALTER TABLE [dbo].[Categories] CHECK CONSTRAINT [FK_Categories_Categories_ParentId]
GO
ALTER TABLE [dbo].[ImageBook]  WITH CHECK ADD  CONSTRAINT [FK_ImageBook_Books_BookId] FOREIGN KEY([BookId])
REFERENCES [dbo].[Books] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ImageBook] CHECK CONSTRAINT [FK_ImageBook_Books_BookId]
GO
ALTER TABLE [dbo].[InvoiceDetails]  WITH CHECK ADD  CONSTRAINT [FK_InvoiceDetails_Books_BookId] FOREIGN KEY([BookId])
REFERENCES [dbo].[Books] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[InvoiceDetails] CHECK CONSTRAINT [FK_InvoiceDetails_Books_BookId]
GO
ALTER TABLE [dbo].[InvoiceDetails]  WITH CHECK ADD  CONSTRAINT [FK_InvoiceDetails_Invoices_InvoiceId] FOREIGN KEY([InvoiceId])
REFERENCES [dbo].[Invoices] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[InvoiceDetails] CHECK CONSTRAINT [FK_InvoiceDetails_Invoices_InvoiceId]
GO
ALTER TABLE [dbo].[Invoices]  WITH CHECK ADD  CONSTRAINT [FK_Invoices_Coupons_CouponId] FOREIGN KEY([CouponId])
REFERENCES [dbo].[Coupons] ([Id])
GO
ALTER TABLE [dbo].[Invoices] CHECK CONSTRAINT [FK_Invoices_Coupons_CouponId]
GO
ALTER TABLE [dbo].[Invoices]  WITH CHECK ADD  CONSTRAINT [FK_Invoices_PaymentMethods_PaymentId] FOREIGN KEY([PaymentId])
REFERENCES [dbo].[PaymentMethods] ([Id])
GO
ALTER TABLE [dbo].[Invoices] CHECK CONSTRAINT [FK_Invoices_PaymentMethods_PaymentId]
GO
ALTER TABLE [dbo].[Invoices]  WITH CHECK ADD  CONSTRAINT [FK_Invoices_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Invoices] CHECK CONSTRAINT [FK_Invoices_Users_UserId]
GO
ALTER TABLE [dbo].[Reviews]  WITH CHECK ADD  CONSTRAINT [FK_Reviews_Books_BookId] FOREIGN KEY([BookId])
REFERENCES [dbo].[Books] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Reviews] CHECK CONSTRAINT [FK_Reviews_Books_BookId]
GO
ALTER TABLE [dbo].[Reviews]  WITH CHECK ADD  CONSTRAINT [FK_Reviews_Invoices_InvoiceId] FOREIGN KEY([InvoiceId])
REFERENCES [dbo].[Invoices] ([Id])
GO
ALTER TABLE [dbo].[Reviews] CHECK CONSTRAINT [FK_Reviews_Invoices_InvoiceId]
GO
ALTER TABLE [dbo].[Wishlists]  WITH CHECK ADD  CONSTRAINT [FK_Wishlists_Books_BookId] FOREIGN KEY([BookId])
REFERENCES [dbo].[Books] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Wishlists] CHECK CONSTRAINT [FK_Wishlists_Books_BookId]
GO
ALTER TABLE [dbo].[Wishlists]  WITH CHECK ADD  CONSTRAINT [FK_Wishlists_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Wishlists] CHECK CONSTRAINT [FK_Wishlists_Users_UserId]
GO
USE [master]
GO
ALTER DATABASE [BookStoreWebDB] SET  READ_WRITE 
GO
